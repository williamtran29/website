import { absClUrl } from 'modules/cloudinary'
import { completeUrl } from 'modules/urlUtil'

export const trainerLd = ({ trainer }, { id } = {}) => ({
  '@context': 'http://schema.org',
  '@type': 'Person',
  ...(id ? { '@id': completeUrl(trainer.link) } : {}),
  gender: 'http://schema.org/Male',
  name: trainer.fullName,
  url: completeUrl(trainer.link),
  image: absClUrl(trainer.picture, 'dpr_2,c_fill,g_face,w_150,h_150'),
})
