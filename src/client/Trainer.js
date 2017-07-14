import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { gql, graphql } from 'react-apollo'
import theme from 'style/theme'
import SecondaryTitle from 'modules/components/SecondaryTitle'
import TrainingList from 'modules/components/TrainingList'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'
import { clUrl } from 'modules/cloudinary'
import ReactMarkdown from 'react-markdown'

const Content = styled.div`flex: 1;`

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
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
      flex-direction: ${props => (props.inverse ? 'row-reverse' : 'row')};
    }
  }
`

const TrainerPicture = styled.img`
  flex-shrink: 0;
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
  font-size: 15px;
  line-height: 1.5;

  @media (min-width: ${theme.medias.phablet}) {
    margin: 0 30px;
  }
`

const withTrainer = graphql(
  gql`
    query trainer($slug: ID!) {
      trainer(slug: $slug) {
        slug
        fullName
        description
        link
        cloudinary_id
        trainings {
          cloudinary_id
          name
          abstract
          duration
          slug
          color
          price
        }
      }
    }
  `,
  {
    options: ({ match }) => ({
      variables: { slug: match.params.slug },
    }),
  },
)

const pluralize = (str, nb) => (nb > 2 ? `${str}s` : str)

export default withTrainer(
  ({ data: { trainer } }) =>
    trainer
      ? <PageContainer>
          <Helmet>
            <title>{`${trainer.fullName} - Formateur JavaScript`}</title>
            <meta
              name="description"
              content={`${trainer.fullName} est formateur JavaScript pour Smooth Code, il donne des cours dans ${trainer
                .trainings.length} ${pluralize(
                'formation',
                trainer.trainings.length,
              )} de haut niveau.`}
            />
            <meta
              property="og:title"
              content={`Smooth Code - ${trainer.fullName} - Formateur JavaScript`}
            />
            <meta
              property="og:image"
              content={clUrl(
                trainer.cloudinary_id,
                'c_fill,g_face,h_400,w_400,dpr_2',
              )}
            />
          </Helmet>
          <Header />
          <Content>
            <Wrapper>
              <Trainer>
                <TrainerPicture
                  src={clUrl(
                    trainer.cloudinary_id,
                    'c_fill,g_face,h_300,w_300,dpr_2',
                  )}
                  alt={trainer.fullName}
                  width="300"
                  height="400"
                />
                <TrainerInfo>
                  <SecondaryTitle>
                    {trainer.fullName}
                  </SecondaryTitle>
                  <ReactMarkdown source={trainer.description} />
                </TrainerInfo>
              </Trainer>
              <SecondaryTitle>Formations proposées</SecondaryTitle>
              <TrainingList trainings={trainer.trainings} />
            </Wrapper>
          </Content>
          <Footer />
        </PageContainer>
      : null,
)
