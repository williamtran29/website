import React from 'react'
import gql from 'graphql-tag'
import { absCl } from 'shared/cloudinary'
import { completeUrl } from 'shared/url'
import JsonLd from './JsonLd'

export const trainerLd = (trainer, { id } = {}) => ({
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

const TrainerLd = ({ trainer, options }) => (
  <JsonLd>{trainerLd(trainer, options)}</JsonLd>
)

export default TrainerLd
