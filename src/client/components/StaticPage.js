import styled, { css } from 'styled-components'
import { th, upTo } from 'smooth-ui'

const StaticPage = styled.div`
  flex: 1;
  margin-bottom: 100px;
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0.2px;
  line-height: 20px;

  header {
    text-align: center;

    p {
      font-size: 18px;
      line-height: 24px;
    }
  }

  h2 {
    font-size: 22px;
    line-height: 26px;
    text-transform: uppercase;
    font-weight: 400;
    border-bottom: 1px solid ${th('gray200')};
    padding-bottom: 5px;
    margin-top: 40px;
  }

  h3 {
    font-size: 20px;
    line-height: 26px;
    font-weight: 400;
    text-transform: uppercase;
    margin-top: 30px;
  }

  table {
    width: 100%;
    border: 1px solid ${th('gray200')};
    border-collapse: collapse;
    text-align: left;

    tr:nth-child(odd) {
      background-color: ${th('gray200')};
    }

    th,
    td {
      border: 1px solid ${th('gray200')};
      padding: 5px 10px;
    }

    th {
      color: ${th('white')};
      background-color: ${th('primary')};
    }
  }

  ${upTo(
    'md',
    css`
      font-size: 18px;
      line-height: 24px;

      header p {
        font-size: 20px;
        line-height: 26px;
      }

      h2 {
        font-size: 26px;
        line-height: 30px;
      }

      h3 {
        font-size: 18px;
        line-height: 24px;
      }
    `,
  )};
`

export default StaticPage
