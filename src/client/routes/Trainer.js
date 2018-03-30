import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import theme from 'client/style/legacyTheme'
import SecondaryTitle from 'client/components/SecondaryTitle'
import Markdown from 'client/components/Markdown'
import ArticleCard, { articleCardFragment } from 'client/components/ArticleCard'
import JsonLd from 'client/components/JsonLd'
import { cl } from 'shared/cloudinary'
import { trainerLd } from 'client/utils/linkedData'
import { homeRoute } from 'shared/routePaths'
import redirectIfNotFound from 'client/hoc/redirectIfNotFound'
import PageContainer from 'client/components/PageContainer'
import Header from 'client/components/Header'
import Footer from 'client/components/Footer'

const Content = styled.div`
  flex: 1;
`

const Wrapper = styled.div`
  width: 100%;
  max-width: 1034px;
  margin: 0 auto 40px;
  padding: 0 20px;
`

const Trainer = styled.div`
  flex: 1;
  display: flex;
  margin: 60px 0 40px;
  flex-direction: column;

  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;

    &:last-child {
      flex-direction: row;
    }
  }
`

const TrainerPicture = styled.img`
  flex-shrink: 0;
  border-radius: 50%;
  width: 100%;
  height: auto;

  @media (min-width: ${theme.medias.phablet}) {
    width: 300px;
    height: 300px;
  }
`

const TrainerInfo = styled.div`
  flex: 1;
  margin: 20px 0 0;

  @media (min-width: ${theme.medias.phablet}) {
    margin: 0 30px;
  }
`

const ArticleListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
`

const QUERY = gql`
  query trainer($slug: String!) {
    trainer(slug: $slug) {
      slug
      fullName
      description
      link
      picture
      articles {
        ...ArticleCard
      }
    }
  }

  ${articleCardFragment}
`

export default compose(
  graphql(QUERY, {
    options: ({ match }) => ({
      variables: { slug: match.params.slug },
    }),
  }),
  redirectIfNotFound({
    key: 'trainer',
    to: homeRoute(),
  }),
)(
  ({ data: { trainer } }) =>
    trainer ? (
      <PageContainer>
        <Helmet>
          <title>{`${trainer.fullName} - Formateur JavaScript`}</title>
          <meta name="description" content={trainer.description} />
          <meta
            property="og:title"
            content={`Smooth Code - ${trainer.fullName} - Formateur JavaScript`}
          />
          <meta
            property="og:image"
            content={cl(trainer.picture, 'c_fill,g_face,h_400,w_400,dpr_2')}
          />
        </Helmet>
        <Header />
        <Content>
          <Wrapper>
            <Trainer>
              <TrainerPicture
                src={cl(trainer.picture, 'c_fill,g_face,h_300,w_300,dpr_2')}
                alt={trainer.fullName}
                width="300"
                height="300"
              />
              <TrainerInfo>
                <SecondaryTitle>{trainer.fullName}</SecondaryTitle>
                <Markdown source={trainer.description} />
              </TrainerInfo>
            </Trainer>
            {trainer.articles.length > 0 && (
              <SecondaryTitle>Derniers articles</SecondaryTitle>
            )}
            {trainer.articles.length > 0 && (
              <ArticleListContainer>
                {trainer.articles.map(article => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </ArticleListContainer>
            )}
          </Wrapper>
        </Content>
        <Footer />
        <JsonLd>{trainerLd({ trainer })}</JsonLd>
      </PageContainer>
    ) : null,
)
