import { connect } from 'redux-bundler-preact'
import { h } from 'preact' // eslint-disable-line no-unused-vars
// import PropTypes from 'prop-types'
import TodoItem from './todo-item'

const TodoList = ({ dataFromFile }) => (
  <ul>
    {dataFromFile.map(todo => (
      <TodoItem {...todo} />
    ))}
  </ul>
)

export default connect(
  'selectDataFromFile',
  TodoList
)
