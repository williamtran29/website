import React from 'react'
import compose from 'recompact/compose'
import Helmet from 'react-helmet-async'
import gql from 'fraql'
import { graphql } from 'react-apollo'
import moment from 'moment'
import { homeRoute } from 'shared/routePaths'
import redirectIfNotFound from 'client/hoc/redirectIfNotFound'
import {
  getSocialPicture,
  sessionSocialPictureFragment,
  getSessionTitle,
  sessionTitleFragment,
  getSessionSummary,
  sessionSummaryFragment,
} from 'shared/session'
import ContactForm from 'client/components/ContactForm'
import TrainingProgram from 'client/components/TrainingProgram'
import TwoColsContainer from 'client/components/TwoColsContainer'
import TwoColsMain from 'client/components/TwoColsMain'
import TwoColsSidebar from 'client/components/TwoColsSidebar'
import TwoColsStickySidebar from 'client/components/TwoColsStickySidebar'
import MainSection from 'client/components/MainSection'
import MainSectionTitle from 'client/components/MainSectionTitle'
import SidebarSection from 'client/components/SidebarSection'
import SidebarSectionTitle from 'client/components/SidebarSectionTitle'
import SidebarSectionText from 'client/components/SidebarSectionText'
import SessionCoverSummary from 'client/components/SessionCoverSummary'
import SessionPrice from 'client/components/SessionPrice'
import LocationAddress from 'client/components/LocationAddress'
import SessionDates from 'client/components/SessionDates'
import PageContainer from 'client/components/PageContainer'
import TrainingCover from 'client/components/TrainingCover'
import Header from 'client/components/Header'
import Footer from 'client/components/Footer'
import SessionLink from 'client/components/SessionLink'

export const sessionPreviewFragment = gql`
  fragment _ on Session {
    id
    training {
      title
      abstract
      ${TrainingCover.fragments.training}
    }
    location {
      ${LocationAddress.fragments.location}
    }
    ${SessionPrice.fragments.session}
    ${SessionDates.fragments.session}
    ${SessionCoverSummary.fragments.session}
    ${sessionTitleFragment}
    ${sessionSummaryFragment}
    ${sessionSocialPictureFragment}
  }
`

const PREVIEW_QUERY = gql`
  query SessionPreviewQuery($id: ID!) {
    sessionPreview: session(id: $id) {
      ${sessionPreviewFragment}
    }
  }
`

const COMPLETE_QUERY = gql`
  query SessionQuery($id: ID!, $trainingSlug: String!) {
    session(id: $id) {
      id
      training {
        ${TrainingProgram.fragments.training}
      }
      ${sessionPreviewFragment}
    }

    siblings: sessions(trainingSlug: $trainingSlug) {
      id
      ${SessionPrice.fragments.siblings}
      ${SessionLink.fragments.session}
    }
  }
`

const options = ({ match }) => ({
  variables: {
    id: match.params.sessionId,
    trainingSlug: match.params.trainingSlug,
  },
  fetchPolicy: 'cache-and-network',
})

export default compose(
  graphql(PREVIEW_QUERY, {
    name: 'previewData',
    options,
  }),
  graphql(COMPLETE_QUERY, {
    name: 'completeData',
    options,
  }),
  redirectIfNotFound({
    key: 'session',
    dataKey: 'previewData',
    to: homeRoute(),
  }),
  redirectIfNotFound({
    key: 'session',
    dataKey: 'completeData',
    to: homeRoute(),
  }),
)(
  ({
    previewData: { sessionPreview },
    completeData: { session, siblings },
  }) => (
    <PageContainer>
      {sessionPreview && (
        <Helmet>
          <title>{getSessionTitle(sessionPreview)}</title>
          <meta name="description" content={sessionPreview.training.abstract} />
          <meta
            property="og:title"
            content={`Formation ${
              sessionPreview.training.title
            } | ${getSessionSummary(sessionPreview)}`}
          />
          <meta
            property="og:description"
            content={sessionPreview.training.abstract}
          />
          <meta
            property="og:image"
            content={getSocialPicture(sessionPreview)}
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:image"
            content={getSocialPicture(sessionPreview)}
          />
          <meta name="robots" content="noindex" />
        </Helmet>
      )}
      <Header transparent />
      {sessionPreview && (
        <TrainingCover training={sessionPreview.training}>
          <SessionCoverSummary session={sessionPreview} />
        </TrainingCover>
      )}
      <TwoColsContainer>
        <TwoColsMain>
          {session && (
            <React.Fragment>
              <TrainingProgram training={session.training} />
              {session.inStock && (
                <MainSection id="contact">
                  <MainSectionTitle>Formulaire d’inscription</MainSectionTitle>
                  <ContactForm
                    subject={`Formation ${session.training.title} du ${moment(
                      session.startDate,
                    ).format('DD/MM/YYYY')} @ smooth-code.com`}
                  />
                </MainSection>
              )}
            </React.Fragment>
          )}
        </TwoColsMain>
        {sessionPreview && (
          <TwoColsSidebar>
            <TwoColsStickySidebar>
              <SidebarSection>
                <SessionPrice session={sessionPreview} siblings={siblings} />
              </SidebarSection>
              <SidebarSection>
                <SidebarSectionTitle>Dates</SidebarSectionTitle>
                <SidebarSectionText>
                  <SessionDates session={sessionPreview} />
                </SidebarSectionText>
                <SidebarSectionTitle>Lieu</SidebarSectionTitle>
                <SidebarSectionText>
                  <LocationAddress location={sessionPreview.location} />
                </SidebarSectionText>
              </SidebarSection>
              <SidebarSection>
                <SidebarSectionTitle>Autres dates</SidebarSectionTitle>
                {siblings &&
                  siblings
                    .filter(({ id }) => id !== session.id)
                    .map(sibling => (
                      <SessionLink key={sibling.id} session={sibling} />
                    ))}
              </SidebarSection>
            </TwoColsStickySidebar>
          </TwoColsSidebar>
        )}
      </TwoColsContainer>
      <Footer />
    </PageContainer>
  ),
)
