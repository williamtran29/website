import React from 'react'
import gql from 'graphql-tag'
import { completeUrl } from 'shared/url'
import { getSocialPicture, sessionSocialPictureFragment } from 'shared/session'
import JsonLd from './JsonLd'
import { trainerLd, trainerLdFragment } from './TrainerLd'

export const sessionLd = (session, { id } = {}) => ({
  '@context': 'http://schema.org',
  '@type': 'EducationEvent',
  ...(id ? { '@id': completeUrl(session.link) } : {}),
  name: session.training.title,
  description: session.training.abstract,
  url: completeUrl(session.link),
  image: getSocialPicture(session),
  eventStatus: 'http://schema.org/EventScheduled',
  startDate: session.startDate,
  endDate: session.endDate,
  location: {
    '@type': 'Place',
    name: 'Smooth Code',
    address: {
      '@type': 'PostalAddress',
      addressLocality: session.location.city,
      addressCountry: {
        '@type': 'Country',
        name: 'FR',
      },
    },
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Tarif normal',
      category: 'Primary',
      price: `${session.training.price}`,
      priceCurrency: 'EUR',
      url: completeUrl(session.link),
      availability: session.inStock
        ? 'http://schema.org/InStock'
        : 'http://schema.org/SoldOut',
      availabilityStarts: session.validFrom,
      validFrom: session.validFrom,
      inventoryLevel: {
        '@type': 'QuantitativeValue',
        value: session.participants,
        minValue: 0,
        maxValue: 10,
        unitText: 'place',
      },
    },
  ],
  performers: session.training.trainers.map(trainer =>
    trainerLd(trainer, { id: true }),
  ),
})

export const sessionLdFragment = gql`
  fragment SessionLd on Session {
    link
    inStock
    startDate
    endDate
    validFrom
    participants
    training {
      title
      abstract
      icon
      color
      price
      trainers {
        ...TrainerLd
      }
    }
    location {
      name
      city
    }
    ...SessionSocialPicture
  }

  ${trainerLdFragment}
  ${sessionSocialPictureFragment}
`

const SessionLd = ({ session, options }) => (
  <JsonLd>{sessionLd(session, options)}</JsonLd>
)

export default SessionLd
