import React from 'react'
import styled from 'styled-components'
import { th } from 'smooth-ui'
import gql from 'graphql-tag'
import ScrollLinkButton from './ScrollLinkButton'
import TrainingPrice, { trainingPriceFragment } from './TrainingPrice'
import SessionLink, { sessionLinkFragment } from './SessionLink'

const NextSessionComponent = ({ siblings = [], session, ...props }) => {
  const nextSession = siblings.filter(
    ({ id, training }) =>
      id !== session.id && training.slug === session.training.slug,
  )[0]

  if (!nextSession) return null

  return (
    <div {...props}>
      Prochaine session<br />
      <SessionLink session={nextSession} />
    </div>
  )
}

const NextSession = styled(NextSessionComponent)`
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  font-size: 16px;
  line-height: 24px;

  a {
    color: ${th('primary')};
  }
`

const Full = styled.div`
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
`

const SessionPriceComponent = ({ session, siblings, ...props }) => (
  <div {...props}>
    <TrainingPrice training={session.training} />
    <div style={{ margin: '20px 0 10px' }}>
      {session.inStock ? (
        <ScrollLinkButton
          style={{ width: '100%', textAlign: 'center' }}
          spy
          smooth
          to="contact"
        >
          S’inscrire
        </ScrollLinkButton>
      ) : (
        <React.Fragment>
          <Full>
            <span role="img" aria-label="Attention">
              😓
            </span>{' '}
            Complet
          </Full>
          {siblings && <NextSession siblings={siblings} session={session} />}
        </React.Fragment>
      )}
    </div>
  </div>
)

const SessionPrice = styled(SessionPriceComponent)`
  margin: 20px 0 10px;
  position: relative;
`

export const sessionPriceFragment = gql`
  fragment SessionPrice on Session {
    id
    inStock
    training {
      slug
      ...TrainingPrice
    }
  }

  ${trainingPriceFragment}
`

export const sessionPriceSiblingFragment = gql`
  fragment SessionPriceSibling on Session {
    id
    training {
      slug
    }
    ...SessionLink
  }

  ${sessionLinkFragment}
`

export default SessionPrice
