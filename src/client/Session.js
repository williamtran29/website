import React from 'react'
import styled from 'styled-components'
import compose from 'recompact/compose'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import { longHumanizeDate } from 'modules/dateUtils'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'
import TrainingHero from 'modules/components/TrainingHero'
import { Link } from 'react-router-dom'
import ContactForm from 'client/contact/ContactForm'
import { trainingRoute } from 'modules/routePaths'
import theme from 'style/theme'

const Container = styled.div`
  flex: 1;
  margin: 10px auto;
  padding: 10px;
  max-width: 1000px;
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
  margin-bottom: 30px;
`

const ContactFormContainer = styled.div`
  max-width: 600px;
  width: 100%;
`

const Iframe = styled.iframe`
  border: 0;
  margin-bottom: 30px;
  max-width: 600px;
  height: 300px;
  width: 100%;
`

const Breadcrumb = styled.div`
  font-size: 20px;
  font-weight: 300;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid ${theme.colors.grayLight};

  a {
    color: ${theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
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
        cloudinary_id
        name
        abstract
        duration
        slug
        color
        price
        ogImageUrl
      }
    }
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
        start_date
        end_date
        location {
          name
          address
          city
          zipcode
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
    if (!training || !session) return null

    const humanizedDate = longHumanizeDate({
      startDate: session.start_date,
      endDate: session.end_date,
    })

    const title = `Session formation "${training.name}" du ${humanizedDate}`
    const description = `Inscrivez-vous pour la formation "${training.name}" du ${humanizedDate}. Les places sont limités !`

    return (
      <PageContainer>
        <Helmet>
          <title>
            {title}
          </title>
          <meta name="title" content={title} />
          <meta name="description" content={description} />
          <meta property="og:title" content={`Smooth Code - ${title}`} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={training && training.ogImageUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:image"
            content={training && training.ogImageUrl}
          />
        </Helmet>
        <Header transparent />
        <TrainingHero training={training} />
        <Container>
          <Breadcrumb>
            <Link to={trainingRoute(training.slug)}>
              {`Formation ${training.name}`}
            </Link>
            {` > Session du ${humanizedDate}`}
          </Breadcrumb>
          <Columns>
            <ContactColumn>
              <Title>S’inscrire</Title>
              <ContactFormContainer>
                <ContactForm
                  submitLabel="S'inscrire à la session"
                  messageLabel="Commentaire"
                  subject={`Inscription formation "${training.name}" du ${humanizedDate}`}
                />
              </ContactFormContainer>
              <PhoneBlock>
                Pour toute question, n’hésitez pas à nous appeler au{' '}
                <a href="tel:+33650588079">06 50 58 80 79</a>, nous nous ferons
                une joie de vous répondre !
              </PhoneBlock>
            </ContactColumn>
            <InfoColumn>
              <Title>Date</Title>
              <Info>
                {humanizedDate}
              </Info>
              <Title>Prix</Title>
              <Info>
                {training.price} €
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
                frameBorder="0"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAivoHcnOYXoBJfO3vq_PmdADJTEOEcKrg&q=${encodeURIComponent(
                  session.location.name,
                )}`}
              />
            </InfoColumn>
          </Columns>
        </Container>
        <Footer />
      </PageContainer>
    )
  },
)
