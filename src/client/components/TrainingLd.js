import React from 'react'
import gql from 'graphql-tag'
import { completeUrl } from 'shared/url'
import JsonLd from './JsonLd'

export const trainingLd = (training, { id } = {}) => ({
  '@context': 'http://schema.org',
  '@type': 'Product',
  ...(id ? { '@id': completeUrl(training.link) } : {}),
  name: `Formation ${training.title}`,
  description: training.abstract,
  url: completeUrl(training.link),
  offers: [
    {
      '@type': 'Offer',
      name: 'Tarif normal',
      category: 'Primary',
      price: `${training.price}`,
      priceCurrency: 'EUR',
      availability: 'http://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Smooth Code',
      },
    },
  ],
})

export const trainingLdFragment = gql`
  fragment TrainingLd on Training {
    link
    title
    abstract
    price
  }
`

const TrainingLd = ({ training, options }) => (
  <JsonLd>{trainingLd(training, options)}</JsonLd>
)

export default TrainingLd
