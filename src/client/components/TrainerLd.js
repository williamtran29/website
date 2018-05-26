import React from 'react'
import gql from 'fraql'
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

const TrainerLd = ({ trainer, options }) => (
  <JsonLd>{trainerLd(trainer, options)}</JsonLd>
)

TrainerLd.fragments = {
  trainer: gql`
    fragment _ on Trainer {
      fullName
      picture
      link
    }
  `,
}

export default TrainerLd
