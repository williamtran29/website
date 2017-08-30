import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Helmet } from 'react-helmet'
import theme from 'style/theme'
import MainTitle from 'modules/components/MainTitle'
import Lead from 'modules/components/Lead'
import JsonLd from 'modules/components/JsonLd'
import Spinner from 'modules/components/Spinner'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'
import { gql, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { lighten } from 'polished'
import { clUrl } from 'modules/cloudinary'
import { completeUrl } from 'modules/urlUtil'
import ArticlesQuery from 'client/queries/ArticlesQuery'

const Container = styled.div`
  flex: 1;
  max-width: 1034px;
  width: 100%;
  margin: 30px auto 100px;
  display: flex;
  flex-wrap: wrap;
`

const Loader = styled.div`
  margin: 50px auto;
  text-align: center;
`

const ArticleTag = styled.div`
  margin-bottom: 5px;
  color: ${lighten(0.2, theme.colors.grayDark)};
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`

const ArticleImageLink = styled(Link)`
  display: block;
  overflow: hidden;
  position: relative;
`

const ArticleImage = styled.div`
  width: auto;
  height: 200px;
  background: #fff no-repeat 50%;
  background-size: cover;
  background-image: url(${props => props.image});
`

const ArticleContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`

const ArticleContentLink = styled(Link)`
  display: block;
  padding: 25px 25px 0;
`

const ArticleHeader = styled.header``

const ArticleTitle = styled.h2`
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  margin: 0 0 10px;
`

const ArticleExcerpt = styled.section`
  p {
    font-size: 15px;
    line-height: 18px;
    font-weight: 300;
    margin: 0 0 20px;
  }
`

const ArticleFooter = styled.footer`
  padding: 0 25px 25px;
  display: flex;
  align-items: center;
`

const ArticleAuthorImage = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  border-radius: 100%;
  object-fit: cover;
`

const ArticleAuthor = styled.span`
  font-size: 14px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`

const articleAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const Article = styled.article`
  display: flex;
  min-height: 300px;
  overflow: hidden;
  margin: 0 20px 5vw;
  border-radius: 3px;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.08), 0 5px 20px 0 rgba(0, 0, 0, 0.06);
  transition: transform 300ms, box-shadow 300ms;
  will-change: transform, box-shadow;
  display: flex;
  flex: 1 1 300px;
  flex-direction: column;
  background-color: #fff;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.08), 0 0 10px 0 rgba(0, 0, 0, 0.06);
  }

  @media (min-width: ${theme.medias.phablet}) {
    animation: 400ms ${articleAnimation} ease-out;
    animation-fill-mode: backwards;
    animation-delay: ${props => props['data-delay']}ms;

    &:nth-child(6n + 1) {
      margin: 0 20px 40px;
      flex: 1 1 100%;
      flex-direction: row;

      ${ArticleImageLink} {
        flex: 1;
      }

      ${ArticleFooter} {
        padding: 0 40px 30px;
      }

      ${ArticleExcerpt} p {
        font-size: 17px;
        line-height: 20px;
      }

      ${ArticleTitle} {
        font-size: 24px;
        line-height: 30px;
        margin: 0 0 20px;
      }

      ${ArticleContentLink} {
        padding: 30px 40px 0;
      }

      ${ArticleContent} {
        flex: 0 1 350px;
      }

      ${ArticleImage} {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }

    &:first-child {
      margin-top: -60px;
    }
  }
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

export default graphql(gql`
  query allArticles {
    articles {
      ...ArticleEssential
    }
  }

  ${ArticlesQuery.fragments.articleEssential}
`)(({ data }) => (
  <PageContainer>
    <Helmet>
      <title>Actualité et articles JavaScript</title>
      <meta
        name="description"
        content="Retrouvez toute l‘actualité de JavaScript, React et Node.js avec Smooth Code."
      />
      <meta property="og:title" content="Le blog Smooth Code" />
    </Helmet>
    <Header transparent />
    <Cover>
      <CoverShadow />
      <MainTitle>Nos articles</MainTitle>
      <Lead>Retrouvez toute l‘actualité de JavaScript, React et Node.js.</Lead>
    </Cover>
    <Container>
      {data.articles ? (
        data.articles.map((article, index) => (
          <Article key={article.slug} data-delay={index * 100}>
            <ArticleImageLink to={article.link}>
              <ArticleImage image={article.feature_image.url} />
            </ArticleImageLink>
            <ArticleContent>
              <ArticleContentLink to={article.link}>
                <ArticleHeader>
                  <ArticleTag>{article.tags[0].name}</ArticleTag>
                  <ArticleTitle>{article.title}</ArticleTitle>
                </ArticleHeader>
                <ArticleExcerpt>
                  <p>{article.custom_excerpt}</p>
                </ArticleExcerpt>
              </ArticleContentLink>
              <ArticleFooter>
                <ArticleAuthorImage
                  src={article.author.profile_image.url}
                  alt={article.author.name}
                />
                <ArticleAuthor>{article.author.name}</ArticleAuthor>
              </ArticleFooter>
            </ArticleContent>
          </Article>
        ))
      ) : (
        <Loader>
          <Spinner className="la-dark" />
        </Loader>
      )}
    </Container>
    <Footer />
    {data.articles && (
      <JsonLd>
        {{
          '@context': 'http://schema.org',
          '@type': 'ItemList',
          itemListElement: data.articles.map((article, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: completeUrl(article.link),
          })),
        }}
      </JsonLd>
    )}
  </PageContainer>
))
