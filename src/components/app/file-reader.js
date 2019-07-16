import { connect } from 'redux-bundler-preact'
import { h } from 'preact' // eslint-disable-line no-unused-vars

const FileReader = ({ doLoadDataFromFile }) => {
  function handleChangeFile (e) {
    doLoadDataFromFile(e.target.files[0])
  }
  return (
    <div>
      <input type="file" accept=".txt" onChange={handleChangeFile} />
    </div>
  )
}

export default connect(
  'selectDataFromFile',
  'doLoadDataFromFile',
  FileReader
)
