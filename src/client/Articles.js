import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import MainTitle from 'modules/components/MainTitle'
import Lead from 'modules/components/Lead'
import JsonLd from 'modules/components/JsonLd'
import Spinner from 'modules/components/Spinner'
import ArticleCard from 'modules/components/ArticleCard'
import Paging from 'modules/components/Paging'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'
import { clUrl } from 'modules/cloudinary'
import { completeUrl } from 'modules/urlUtil'
import { articleCardFragment } from 'modules/queries'

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
  background-image: url("${clUrl('home-cover_pqehlq')}");
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
  query($slug: Int) {
    articles(page: $slug, limit: 10) {
      posts {
        ...ArticleCard
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

  ${articleCardFragment}
`

export default graphql(QUERY, {
  options: ({ match }) => ({
    variables: { slug: match.params.slug },
  }),
})(({ data }) => (
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
      <Lead>Retrouvez toute l’actualité de JavaScript, React et GraphQL.</Lead>
    </Cover>
    <Container>
      {console.log(`data : ${data.articles}`)}
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
      <Paging data={data} />
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
))
