import { h } from 'preact'
import { Box } from '@components/primitives'
import FileReader from '../app/file-reader'
import TodoList from '../app/todo-list'

export const Page = (props) => (
  <Box {...props}>
    <FileReader />
    <TodoList />
  </Box>
)
