import { h } from 'preact'
import { Box } from '@components/primitives'
import FileReader from '../app/file-reader'

export const Page = (props) => (
  <Box {...props}>
    <FileReader />
  </Box>
)
