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

export const trainingPreviewFragment = gql`
  fragment _ on Training {
    id
    slug
    title
    abstract
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
    ${TrainingCover.fragments.training}
  }
`

const PREVIEW_QUERY = gql`
  query TrainingPreviewQuery($slug: String!) {
    trainingPreview: training(slug: $slug) {
      ${trainingPreviewFragment}
    }
  }
`

const COMPLETE_QUERY = gql`
  query TrainingQuery($slug: String!) {
    training(slug: $slug) {
      id
      title
      abstract
      slug
      ${TrainingProgram.fragments.training}
      ${TrainingCover.fragments.training}
      ${TrainingLd.fragments.training}
      ${trainingPreviewFragment}
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

const options = ({ match }) => ({
  variables: { slug: match.params.slug },
  fetchPolicy: 'cache-and-network',
})

export default compose(
  graphql(PREVIEW_QUERY, {
    name: 'previewData',
    options,
  }),
  graphql(COMPLETE_QUERY, {
    options,
    props: ({ data, ownProps }) =>
      data.sessions && data.allSessions && data.training
        ? {
            ...ownProps,
            completeData: data,
            mainSessions: getMainSessions(data.allSessions).filter(
              session => session.training.slug !== data.training.slug,
            ),
          }
        : { ...ownProps, completeData: data },
  }),
  redirectIfNotFound({
    key: 'training',
    dataKey: 'previewData',
    to: homeRoute(),
  }),
)(
  ({
    completeData: { training, sessions, mainSessions },
    previewData: { trainingPreview },
  }) => (
    <PageContainer>
      <Header transparent />
      {trainingPreview && (
        <Helmet>
          <title>{`Formation ${trainingPreview.title}`}</title>
          <meta name="description" content={trainingPreview.abstract} />
          <meta
            property="og:title"
            content={`Formation ${trainingPreview.title}`}
          />
          <meta property="og:description" content={trainingPreview.abstract} />
          <meta
            property="og:image"
            content={getSocialPicture(trainingPreview.nextSession)}
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:image"
            content={getSocialPicture(trainingPreview.nextSession)}
          />
        </Helmet>
      )}
      {training && <TrainingLd training={training} />}
      {sessions &&
        sessions.map(session => (
          <SessionLd key={session.id} session={session} />
        ))}
      {trainingPreview && (
        <TrainingCover training={trainingPreview}>
          <SessionCoverSummary session={trainingPreview.nextSession} />
        </TrainingCover>
      )}
      <TwoColsContainer>
        <TwoColsMain>
          {training && <TrainingProgram training={training} />}
          {training && (
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
          )}
        </TwoColsMain>
        {trainingPreview && (
          <TwoColsSidebar>
            <TwoColsStickySidebar>
              <SidebarSection>
                <SessionPrice
                  session={trainingPreview.nextSession}
                  siblings={sessions || []}
                />
              </SidebarSection>
              <SidebarSection>
                <SidebarSectionTitle>Prochaines dates</SidebarSectionTitle>
                <SidebarSectionText>
                  <SessionDates session={trainingPreview.nextSession} />
                </SidebarSectionText>
                <SidebarSectionTitle>Lieu</SidebarSectionTitle>
                <SidebarSectionText>
                  <LocationAddress
                    location={trainingPreview.nextSession.location}
                  />
                </SidebarSectionText>
              </SidebarSection>
              {sessions && (
                <SidebarSection>
                  <SidebarSectionTitle>Autres dates</SidebarSectionTitle>
                  {sessions
                    .filter(({ id }) => id !== training.nextSession.id)
                    .map(session => (
                      <SessionLink key={session.id} session={session} />
                    ))}
                </SidebarSection>
              )}
              {mainSessions && (
                <SidebarSection>
                  <SidebarSectionTitle>Autres formations</SidebarSectionTitle>
                  {mainSessions.map(session => (
                    <SessionLink key={session.id} session={session} />
                  ))}
                </SidebarSection>
              )}
            </TwoColsStickySidebar>
          </TwoColsSidebar>
        )}
      </TwoColsContainer>
      <Footer />
    </PageContainer>
  ),
)
