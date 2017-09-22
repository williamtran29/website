import styled from 'styled-components'
import theme from 'style/theme'

const Table = styled.table`
  width: 100%;
  border: solid 1px ${theme.colors.grayLight};
  border-collapse: collapse;
  text-align: left;

  tr:nth-child(odd) {
    background-color: ${theme.colors.grayLight};
  }

  th {
    color: white;
    background-color: ${theme.colors.primary};
    border: solid 1px ${theme.colors.grayLight};
    padding: 5px 10px;
  }

  td {
    border: solid 1px ${theme.colors.grayLight};
    padding: 5px 10px;
  }
`

export default Table
