import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet-async'
import gql from 'fraql'
import { graphql } from 'react-apollo'
import MainTitle from 'client/components/MainTitle'
import Lead from 'client/components/Lead'
import JsonLd from 'client/components/JsonLd'
import Spinner from 'client/components/Spinner'
import ArticleCard from 'client/components/ArticleCard'
import Paginator from 'client/components/Paginator'
import PageContainer from 'client/components/PageContainer'
import Header from 'client/components/Header'
import Footer from 'client/components/Footer'
import { cl } from 'shared/cloudinary'
import { completeUrl } from 'shared/url'
import Status from 'client/components/Status'
import { NoMatch } from 'client/routes'
import { articlesRoute, latestArticlesRoute } from 'shared/routePaths'

const Container = styled.div`
  flex: 1;
  max-width: 1034px;
  width: 100%;
  margin: 30px auto 0px;
  display: flex;
  flex-wrap: wrap;
`

const Loader = styled.div`
  margin: 50px auto;
  text-align: center;
`

const Cover = styled.div`
  position: relative;
  background-color: #261d16;
  background-image: url("${cl('home-cover_pqehlq')}");
  background-size: cover;
  height: 300px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 10px;
  color: white;

  h1,
  p {
    z-index: 2;
  }
`

const CoverShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background-image: linear-gradient(0, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
  z-index: 0;
`
const QUERY = gql`
  query($page: Int) {
    articles(page: $page, limit: 10) {
      posts {
        ${ArticleCard.fragments.article}
      }
      meta {
        pagination {
          limit
          page
          total
        }
      }
    }
  }
`

export default graphql(QUERY, {
  options: ({ match }) => ({
    variables: { page: Number(match.params.page || 1) },
  }),
})(({ data }) => {
  if (
    data &&
    data.articles &&
    data.articles.posts &&
    data.articles.posts.length === 0
  )
    return (
      <Status code={404}>
        <NoMatch />
      </Status>
    )

  const route = pageIndex =>
    pageIndex === 1 ? latestArticlesRoute() : articlesRoute(pageIndex)
  return (
    <PageContainer>
      <Helmet>
        <title>Actualité et articles JavaScript</title>
        <meta
          name="description"
          content="Retrouvez toute l’actualité de JavaScript, React et GraphQL avec Smooth Code."
        />
        <meta property="og:title" content="Les articles Smooth Code" />
      </Helmet>
      <Header transparent />
      <Cover>
        <CoverShadow />
        <MainTitle>Nos articles</MainTitle>
        <Lead>
          Retrouvez toute l’actualité de JavaScript, React et GraphQL.
        </Lead>
      </Cover>
      <Container>
        {data.articles ? (
          data.articles.posts.map(article => (
            <ArticleCard key={article.slug} article={article} featuring />
          ))
        ) : (
          <Loader>
            <Spinner className="la-dark" />
          </Loader>
        )}
      </Container>
      {data.articles ? (
        <Paginator
          itemPerPage={data.articles.meta.pagination.limit}
          currentPage={data.articles.meta.pagination.page}
          itemCount={data.articles.meta.pagination.total}
          route={route}
        />
      ) : (
        <Loader>
          <Spinner className="la-dark" />
        </Loader>
      )}
      <Footer />
      {data.articles && (
        <JsonLd>
          {{
            '@context': 'http://schema.org',
            '@type': 'ItemList',
            itemListElement: data.articles.posts.map((article, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: completeUrl(article.link),
            })),
          }}
        </JsonLd>
      )}
    </PageContainer>
  )
})
