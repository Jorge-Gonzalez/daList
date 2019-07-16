import {readAsText} from 'promise-file-reader'

export default {
  name: 'extra-args',
  getExtraArgs: (store) => ({
    readLocalFile: (file) => 
      readAsText(file)
        .then(str => str)
        .catch(err => {
          throw err
        })
  })
}
