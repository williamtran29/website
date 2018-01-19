import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HorizontalList = styled.div`
  display: flex;
  list-style-type: none;
  width: 200px;
  margin: 0px auto 30px;
  justify-content: center;
  padding: 0px;
`

const PageId = styled.div`
  flex: 1;
  width: 20px;
  padding: 10px;
  justify-content: center;
  text-align: center;
`

const CurrentPageIndex = styled.span`
  font-weight: bold;
`

const PageLink = styled(Link)`
  text-decoration: underline;
`

const Paginator = ({ itemPerPage, currentPage, itemCount, route }) => {
  const pageCount = Math.ceil(itemCount / itemPerPage)
  const buttonList = [...Array(pageCount).keys()].map(index => {
    const pageIndex = index + 1
    return currentPage !== pageIndex ? (
      <PageId key={pageIndex}>
        <PageLink to={route(pageIndex)}>{pageIndex}</PageLink>
      </PageId>
    ) : (
      <PageId key={pageIndex}>
        <CurrentPageIndex>{pageIndex}</CurrentPageIndex>
      </PageId>
    )
  })
  return <HorizontalList>{buttonList}</HorizontalList>
}

Paginator.propTypes = {
  itemPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemCount: PropTypes.number.isRequired,
  route: PropTypes.func.isRequired,
}

export default Paginator
