import gql from 'graphql-tag'
import { absCl } from 'shared/cloudinary'
import { completeUrl } from 'shared/url'

export const trainerLd = ({ trainer }, { id } = {}) => ({
  '@context': 'http://schema.org',
  '@type': 'Person',
  ...(id ? { '@id': completeUrl(trainer.link) } : {}),
  gender: 'http://schema.org/Male',
  name: trainer.fullName,
  url: completeUrl(trainer.link),
  image: absCl(trainer.picture, 'dpr_2,c_fill,g_face,w_150,h_150'),
})

export const trainerLdFragment = gql`
  fragment TrainerLd on Trainer {
    fullName
    picture
    link
  }
`

export const sessionLd = (session, { id } = {}) => ({
  '@context': 'http://schema.org',
  '@type': 'Event',
  ...(id ? { '@id': completeUrl(session.link) } : {}),
  name: session.training.title,
  description: session.training.abstract,
  url: completeUrl(session.link),
  image: absCl(
    session.training.icon,
    `b_rgb:${session.training.color},c_scale,w_150,h_150,dpr_2`,
  ),
  eventStatus: 'http://schema.org/EventScheduled',
  startDate: session.startDate,
  endDate: session.endDate,
  location: {
    '@type': 'Place',
    name: session.location.city,
    address: {
      '@type': 'PostalAddress',
      streetAddress: session.location.address,
      postalCode: session.location.zipcode,
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
    trainerLd({ trainer }, { id: true }),
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
      address
      zipcode
      city
    }
  }

  ${trainerLdFragment}
`
