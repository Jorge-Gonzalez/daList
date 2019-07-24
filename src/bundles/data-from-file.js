// TODO this bundle is doing the parsing of the text file as well as the reading of a local file
// this may be separated also other sources are goin to be implemented as dropbox or google drive.
import { readAsText } from 'promise-file-reader'
import {
  isEmpty,
  flat,
  matchGroups,
  mergeWith,
  concat,
  reduce
} from '../../lib/fp'

// Captured groups: isDone, priority, date1, date2 and text
const partsRegex = /(?:(x) )?(?:\(([A-Z])\) )?(\d{4}-\d{2}-\d{2} )?(\d{4}-\d{2}-\d{2} )?(.+)/
const metadataRegex = /([^:\s]+):([^\s:]+)/g
const projectsRegex = /(?:^|\s)\+(\w+)/g
const contextsRegex = /(?:^|\s)@(\w+)/g

// Matches the main parts of a todo txt entry.
const getParts = str => str.match(partsRegex) || []

const defaultToEmpty = (key, val) => isEmpty(val) ? {} : { [key]: val }

const propFromMatches = (key, regex, str) =>
  defaultToEmpty(key, flat(matchGroups(regex, str)))

const buildTodoObj = ([, done, priority, date1, date2, text]) => {
  let isDone = done === 'x'
  return {
    isDone,
    priority,
    creationDate: (!isDone && date1) || (isDone && date2),
    completionDate: isDone && date1,
    text,
    metadata: {
      ...propFromMatches('projects', projectsRegex, text),
      ...propFromMatches('contexts', contextsRegex, text),
      ...reduce(
        (obj, [key, val]) => mergeWith(concat, obj, { [key]: val }),
        {},
        matchGroups(metadataRegex, text)
      )
    }
  }
}

const parseTodos = (txt) =>
  txt.split(/\r\n|\r|\n/g)
    .filter(entry => !isEmpty(entry))
    .map(entry => buildTodoObj(getParts(entry)))

export default {
  name: 'dataFromFile',
  getReducer: () => {
    const initialState = {
      todos: []
    }
    return (state = initialState, { type, payload }) => {
      if (type === 'LOCAL_FILE_LOADED') {
        return { ...state,
          todos: payload
        }
      }
      return state
    }
  },
  doLoadDataFromFile: (path) => ({ dispatch }) => {
    readAsText(path)
      .then(data => {
        dispatch({ type: 'LOCAL_FILE_LOADED', payload: parseTodos(data) })
      })
      .catch(err => console.error(err))
  },
  selectDataFromFile: state => state.dataFromFile.todos
}
