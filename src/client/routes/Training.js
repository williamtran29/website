import React from 'react'
import compose from 'recompact/compose'
import Helmet from 'react-helmet-async'
import gql from 'fraql'
import moment from 'moment'
import { graphql } from 'react-apollo'
import { homeRoute } from 'shared/routePaths'
import redirectIfNotFound from 'client/hoc/redirectIfNotFound'
import {
  getSocialPicture,
  sessionSocialPictureFragment,
  getMainSessions,
  mainSessionFragment,
} from 'shared/session'
import TrainingProgram from 'client/components/TrainingProgram'
import TwoColsContainer from 'client/components/TwoColsContainer'
import TwoColsMain from 'client/components/TwoColsMain'
import TwoColsSidebar from 'client/components/TwoColsSidebar'
import TwoColsStickySidebar from 'client/components/TwoColsStickySidebar'
import PageContainer from 'client/components/PageContainer'
import SidebarSection from 'client/components/SidebarSection'
import SidebarSectionTitle from 'client/components/SidebarSectionTitle'
import SidebarSectionText from 'client/components/SidebarSectionText'
import LocationAddress from 'client/components/LocationAddress'
import SessionDates from 'client/components/SessionDates'
import SessionPrice from 'client/components/SessionPrice'
import TrainingCover from 'client/components/TrainingCover'
import SessionCoverSummary from 'client/components/SessionCoverSummary'
import SessionLink from 'client/components/SessionLink'
import Header from 'client/components/Header'
import Footer from 'client/components/Footer'
import MainSection from 'client/components/MainSection'
import MainSectionTitle from 'client/components/MainSectionTitle'
import ContactForm from 'client/components/ContactForm'
import TrainingLd from 'client/components/TrainingLd'
import SessionLd from 'client/components/SessionLd'

const COMPLETE_QUERY = gql`
  query TrainingQuery($slug: String!) {
    training(slug: $slug) {
      id
      title
      abstract
      slug
      nextSession {
        id
        location {
          ${LocationAddress.fragments.location}
        }
        ${SessionPrice.fragments.session}
        ${SessionDates.fragments.session}
        ${SessionCoverSummary.fragments.session}
        ${sessionSocialPictureFragment}
      }
      ${TrainingProgram.fragments.training}
      ${TrainingCover.fragments.training}
      ${TrainingLd.fragments.training}
    }

    sessions(trainingSlug: $slug) {
      id
      ${SessionPrice.fragments.siblings}
      ${SessionLink.fragments.session}
      ${SessionLd.fragments.session}
    }

    allSessions: sessions {
      id
      training {
        slug
      }
      ${SessionLink.fragments.session}
      ${mainSessionFragment}
    }
  }
`

export default compose(
  graphql(COMPLETE_QUERY, {
    options: ({ match }) => ({
      variables: { slug: match.params.slug },
      fetchPolicy: 'cache-and-network',
    }),
    props: ({ data, ownProps }) =>
      data.sessions && data.allSessions && data.training
        ? {
            ...ownProps,
            data,
            mainSessions: getMainSessions(data.allSessions).filter(
              session => session.training.slug !== data.training.slug,
            ),
          }
        : { ...ownProps, data },
  }),
  redirectIfNotFound({
    key: 'training',
    to: homeRoute(),
  }),
)(({ data: { training, sessions }, mainSessions }) => (
  <PageContainer>
    <Header transparent />
    {training &&
      sessions && (
        <React.Fragment>
          <Helmet>
            <title>{`Formation ${training.title}`}</title>
            <meta name="description" content={training.abstract} />
            <meta property="og:title" content={`Formation ${training.title}`} />
            <meta property="og:description" content={training.abstract} />
            <meta
              property="og:image"
              content={getSocialPicture(training.nextSession)}
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:image"
              content={getSocialPicture(training.nextSession)}
            />
          </Helmet>
          <TrainingLd training={training} />
          {sessions.map(session => (
            <SessionLd key={session.id} session={session} />
          ))}
          <TrainingCover training={training}>
            <SessionCoverSummary session={training.nextSession} />
          </TrainingCover>
          <TwoColsContainer>
            <TwoColsMain>
              <TrainingProgram training={training} />
              <MainSection id="contact">
                <MainSectionTitle>Formulaire d’inscription</MainSectionTitle>
                <ContactForm
                  subject={`Formation ${
                    training.nextSession.training.title
                  } du ${moment(training.nextSession.startDate).format(
                    'DD/MM/YYYY',
                  )} @ smooth-code.com`}
                />
              </MainSection>
            </TwoColsMain>
            {training && (
              <TwoColsSidebar>
                <TwoColsStickySidebar>
                  <SidebarSection>
                    <SessionPrice
                      session={training.nextSession}
                      siblings={sessions}
                    />
                  </SidebarSection>
                  <SidebarSection>
                    <SidebarSectionTitle>Prochaines dates</SidebarSectionTitle>
                    <SidebarSectionText>
                      <SessionDates session={training.nextSession} />
                    </SidebarSectionText>
                    <SidebarSectionTitle>Lieu</SidebarSectionTitle>
                    <SidebarSectionText>
                      <LocationAddress
                        location={training.nextSession.location}
                      />
                    </SidebarSectionText>
                  </SidebarSection>
                  <SidebarSection>
                    <SidebarSectionTitle>Autres dates</SidebarSectionTitle>
                    {sessions
                      .filter(({ id }) => id !== training.nextSession.id)
                      .map(session => (
                        <SessionLink key={session.id} session={session} />
                      ))}
                  </SidebarSection>
                  <SidebarSection>
                    <SidebarSectionTitle>Autres formations</SidebarSectionTitle>
                    {mainSessions.map(session => (
                      <SessionLink key={session.id} session={session} />
                    ))}
                  </SidebarSection>
                </TwoColsStickySidebar>
              </TwoColsSidebar>
            )}
          </TwoColsContainer>
        </React.Fragment>
      )}
    <Footer />
  </PageContainer>
))
