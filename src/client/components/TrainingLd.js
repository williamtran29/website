import React from 'react'
import gql from 'fraql'
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

const TrainingLd = ({ training, options }) => (
  <JsonLd>{trainingLd(training, options)}</JsonLd>
)

TrainingLd.fragments = {
  training: gql`
    fragment _ on Training {
      link
      title
      abstract
      price
    }
  `,
}

export default TrainingLd
