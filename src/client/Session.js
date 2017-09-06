import React from 'react'
import styled from 'styled-components'
import compose from 'recompact/compose'
import { Helmet } from 'react-helmet'
import { gql, graphql } from 'react-apollo'
import PageContainer from 'client/PageContainer'
import Header from 'client/Header'
import Footer from 'client/Footer'
import JsonLd from 'modules/components/JsonLd'
import TrainingHero from 'modules/components/TrainingHero'
import { Link as RRLink } from 'react-router-dom'
import Link from 'modules/components/Link'
import Breadcrumb from 'modules/components/Breadcrumb'
import ContactForm from 'client/contact/ContactForm'
import TrainingsQuery from 'client/queries/TrainingsQuery'
import { sessionLd } from 'client/linkedData'
import { trainingsRoute } from 'modules/routePaths'
import theme from 'style/theme'

const StyledLink = Link.withComponent(RRLink)

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
        id
        title
        abstract
        humanizedPeriod
        link
        validFrom
        startDate
        endDate
        participants
        inStock
        location {
          id
          name
          address
          city
          zipcode
        }
        training {
          slug
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

const Full = styled.div`
  font-size: 30px;
  line-height: 40px;
  text-align: center;
`

export default compose(
  withTraining,
  withSession,
)(
  ({
    trainingData: { training },
    trainingSessionData: { trainingSession: session },
  }) => (
    <PageContainer>
      {session &&
      training && (
        <Helmet>
          <title>{session.title}</title>
          <meta name="title" content={session.title} />
          <meta name="description" content={session.abstract} />
          <meta property="og:title" content={session.title} />
          <meta property="og:description" content={session.abstract} />
          <meta property="og:image" content={training.socialPicture} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={training.socialPicture} />
        </Helmet>
      )}
      <Header transparent />
      {training && <TrainingHero {...training} />}
      <Container>
        {session &&
        training && (
          <Breadcrumb
            links={[
              {
                url: trainingsRoute(),
                name: 'Nos formations',
              },
              {
                url: training.link,
                name: training.title,
              },
              {
                url: session.link,
                name: `Session ${session.humanizedPeriod}`,
              },
            ]}
          />
        )}
        {session &&
        training && (
          <Columns>
            <ContactColumn>
              {session.participants === 10 ? (
                <Full>
                  Désolé cette session est déjà complète,{' '}
                  <StyledLink to={training.link}>
                    consultez les autres sessions disponibles
                  </StyledLink>.
                </Full>
              ) : (
                <div>
                  <Title>S’inscrire</Title>
                  <ContactFormContainer>
                    <ContactForm
                      submitLabel="S'inscrire à la session"
                      messageLabel="Commentaire"
                      subject={`Inscription formation ${training.title} du ${session.humanizedPeriod}`}
                    />
                  </ContactFormContainer>
                  <PhoneBlock>
                    Pour toute question, n’hésitez pas à nous appeler au{' '}
                    <Link href="tel:+33650588079">06 50 58 80 79</Link>, nous
                    nous ferons une joie de vous répondre !
                  </PhoneBlock>
                </div>
              )}
            </ContactColumn>
            <InfoColumn>
              <Title>Date</Title>
              <Info>{session.humanizedPeriod}</Info>
              <Title>Prix</Title>
              <Info>{training.interPrice}€ HT / pers.</Info>
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
          </Columns>
        )}
      </Container>
      <Footer />
      {session &&
      training && (
        <JsonLd>
          {sessionLd({
            session,
            training,
            trainers: session.training.trainers,
          })}
        </JsonLd>
      )}
      <img
        alt="Google Tracking"
        src="//www.googleadservices.com/pagead/conversion/847457408/?label=egR2CPvqp3QQgNmMlAM&amp;guid=ON&amp;script=0"
        width="1"
        height="1"
      />
    </PageContainer>
  ),
)
