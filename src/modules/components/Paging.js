import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { articlesRoute } from 'modules/routePaths'
import List from 'modules/components/List'

const HorizontalList = styled(List)`
  display: flex;
  list-style-type: none;
  width: 200px;
  margin: 0px auto 30px;
  justify-content: center;
  padding: 0px;
`

const PageId = styled.li`
  flex: 1;
  width: 20px;
  padding: 10px;
  justify-content: center;
  text-align: center;
`

const CurrentPageIndex = styled.span`
  font-weight: bold;
`

const PagingLink = styled(Link)`
  text-decoration: underline;
`

const Paging = ({ data }) => {
  const pageCount = Math.ceil(
    data.articles.meta.pagination.total / data.articles.meta.pagination.limit,
  )
  const currentPage = data.articles.meta.pagination.page
  const buttonList = []
  for (let index = 1; index <= pageCount; index += 1) {
    const pagingItem =
      currentPage !== index ? (
        <PageId key={index}>
          <PagingLink to={articlesRoute(index)} onClick={() => data.refetch()}>
            {index}
          </PagingLink>
        </PageId>
      ) : (
        <PageId key={index}>
          <CurrentPageIndex>{index}</CurrentPageIndex>
        </PageId>
      )
    buttonList.push(pagingItem)
  }
  return <HorizontalList>{buttonList}</HorizontalList>
}

export default Paging
