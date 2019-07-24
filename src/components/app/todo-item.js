import { h } from 'preact' // eslint-disable-line no-unused-vars

// Returns an array with the unmodified string segments and the replacements
// performed for the supplied function over the matched occurences.
function replaceAndSplit (str, rgx, fn) {
  let output = []
  let idx = 0
  str.replace(rgx, (match, ...args) => {
    let offset = args[args.length - 2]
    let string = args[args.length - 1]
    // store any text previous the match
    output.push(string.substring(idx, offset))
    idx = offset + match.length
    // store the replacement fn result
    output.push(fn(match, ...args))
  })
  // store any remaining text
  output.push(str.substring(idx))
  return output
}

// Build span elements for metadata
const buildFragment = (txt) =>
  replaceAndSplit(
    txt,
    /(\B@|\B\+|\w+:)((?:\w|-)+)/g,
    (match, key, value) =>
      key === '+'
        ? <span className="projects">{value}</span>
        : key === '@'
          ? <span class="contexts">{value}</span>
          : <span class={'meta ' + key.substring(0, key.length - 1)}>{match}</span>
  )

const TodoItem = ({ text, priority }) => (
  <li>
    <span className="priority">{priority} </span>
    {buildFragment(text)}
  </li>
)

export default TodoItem
