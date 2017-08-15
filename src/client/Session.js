import React from 'react'
import styled from 'styled-components'
import compose from 'recompact/compose'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import { longHumanizeDate } from 'modules/dateUtils'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'
import JsonLd from 'modules/components/JsonLd'
import TrainingHero from 'modules/components/TrainingHero'
import Link, { RouterLink } from 'modules/components/Link'
import ContactForm from 'client/contact/ContactForm'
import { trainingRoute } from 'modules/routePaths'
import TrainingsQuery from 'client/queries/TrainingsQuery'
import { sessionLd, breadcrumbLd } from 'client/linkedData'
import { completeUrl } from 'modules/urlUtil'
import theme from 'style/theme'

const Container = styled.div`
  flex: 1;
  margin: 10px auto;
  padding: 10px;
  max-width: 1034px;
  min-height: 500px;
  width: 100%;
`

const Title = styled.div`
  font-size: 18px;
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 5px;
`

const Info = styled.div`
  font-size: 30px;
  line-height: 40px;
  margin-bottom: 30px;
`

const ContactFormContainer = styled.div`
  max-width: 600px;
  width: 100%;
`

const Iframe = styled.iframe.attrs({
  frameBorder: 0,
})`
  border: 0;
  margin-bottom: 30px;
  max-width: 600px;
  height: 300px;
  width: 100%;
`

const Breadcrumb = styled.div`
  font-size: 20px;
  line-height: 24px;
  font-weight: 300;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid ${theme.colors.grayLight};
`

const Columns = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
  }
`

const ContactColumn = styled.div`
  flex: 1;

  @media (min-width: ${theme.medias.phablet}) {
    margin-right: 30px;
  }
`

const InfoColumn = styled.div`
  flex-shrink: 0;

  @media (min-width: ${theme.medias.phablet}) {
    width: 350px;
  }
`

const Address = styled.address`
  font-style: normal;
  font-size: 18px;
  margin-bottom: 20px;
`

const PhoneBlock = styled.div`
  margin: 30px 0;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.3;
`

const withTraining = graphql(
  gql`
    query trainingData($slug: ID!) {
      training(slug: $slug) {
        ...TrainingEssential
      }
    }

    ${TrainingsQuery.fragments.trainingEssential}
  `,
  {
    name: 'trainingData',
    options: ({ match }) => ({
      variables: { slug: match.params.trainingSlug },
    }),
  },
)

const withSession = graphql(
  gql`
    query trainingSessionData($id: ID!) {
      trainingSession(id: $id) {
        link
        created_at
        start_date
        end_date
        location {
          name
          address
          city
          zipcode
        }
        training {
          trainers {
            slug
            fullName
            link
            picture
          }
        }
      }
    }
  `,
  {
    name: 'trainingSessionData',
    options: ({ match }) => ({
      variables: { id: match.params.sessionId },
    }),
  },
)

export default compose(
  withTraining,
  withSession,
)(
  ({
    trainingData: { training },
    trainingSessionData: { trainingSession: session },
  }) => {
    const humanizedDate =
      session &&
      longHumanizeDate({
        startDate: session.start_date,
        endDate: session.end_date,
      })

    const title =
      humanizedDate &&
      training &&
      `Formation "${training.title}" du ${humanizedDate}`

    const description =
      humanizedDate &&
      training &&
      `Inscrivez-vous pour la formation "${training.title}" du ${humanizedDate}.`

    return (
      <PageContainer>
        {title &&
          description &&
          training &&
          <Helmet>
            <title>
              {title}
            </title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta property="og:title" content={`Smooth Code - ${title}`} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={training.socialPicture} />
            <meta name="twitter:card" content="summary_large_image" />
          </Helmet>}
        <Header transparent />
        {training && <TrainingHero {...training} />}
        <Container>
          {session &&
            training &&
            <Breadcrumb>
              <RouterLink to="/trainings">Nos formations</RouterLink>
              {' > '}
              <RouterLink to={trainingRoute(training.slug)}>
                {training.title}
              </RouterLink>
              {` > Session ${humanizedDate}`}
              <JsonLd>
                {breadcrumbLd({
                  links: [
                    {
                      url: completeUrl('/trainings'),
                      name: 'Nos formations',
                    },
                    {
                      url: completeUrl(training.link),
                      name: training.title,
                    },
                    {
                      url: completeUrl(session.link),
                      name: `Session ${humanizedDate}`,
                    },
                  ],
                })}
              </JsonLd>
            </Breadcrumb>}
          {session &&
            training &&
            <Columns>
              <ContactColumn>
                <Title>S’inscrire</Title>
                <ContactFormContainer>
                  <ContactForm
                    submitLabel="S'inscrire à la session"
                    messageLabel="Commentaire"
                    subject={`Inscription formation "${training.title}" du ${humanizedDate}`}
                  />
                </ContactFormContainer>
                <PhoneBlock>
                  Pour toute question, n’hésitez pas à nous appeler au{' '}
                  <Link href="tel:+33650588079">06 50 58 80 79</Link>, nous nous
                  ferons une joie de vous répondre !
                </PhoneBlock>
              </ContactColumn>
              <InfoColumn>
                <Title>Date</Title>
                <Info>
                  {humanizedDate}
                </Info>
                <Title>Prix</Title>
                <Info>
                  {training.interPrice}€ HT / pers.
                </Info>
                <Title>Lieu</Title>
                <Address>
                  {session.location.name}
                  <br />
                  {session.location.address}
                  <br />
                  {session.location.zipcode} {session.location.city}
                </Address>
                <Iframe
                  title={session.location.name}
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAivoHcnOYXoBJfO3vq_PmdADJTEOEcKrg&q=${encodeURIComponent(
                    session.location.name,
                  )}`}
                />
              </InfoColumn>
            </Columns>}
        </Container>
        <Footer />
        {session &&
          training &&
          <JsonLd>
            {sessionLd({
              session,
              training,
              trainers: session.training.trainers,
            })}
          </JsonLd>}
      </PageContainer>
    )
  },
)
