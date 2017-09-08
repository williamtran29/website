import { absClUrl } from 'modules/cloudinary'
import { completeUrl } from 'modules/urlUtil'

export const breadcrumbLd = ({ links }) => ({
  '@context': 'http://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: links.map(({ name, url }, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@id': url,
      name,
    },
  })),
})

export const trainerLd = ({ trainer }, { id } = {}) => ({
  '@context': 'http://schema.org',
  '@type': 'Person',
  ...(id ? { '@id': completeUrl(trainer.link) } : {}),
  gender: 'http://schema.org/Male',
  name: trainer.fullName,
  url: completeUrl(trainer.link),
  image: absClUrl(trainer.picture, 'dpr_2,c_fill,g_face,w_150,h_150'),
})

export const sessionLd = ({ session, training, trainers }, { id } = {}) => ({
  '@context': 'http://schema.org',
  '@type': 'EducationEvent',
  ...(id ? { '@id': completeUrl(session.link) } : {}),
  name: training.longTitle,
  description: training.abstract,
  url: completeUrl(session.link),
  image: absClUrl(training.icon, 'c_scale,w_150,h_150,dpr_2'),
  eventStatus: 'http://schema.org/EventScheduled',
  startDate: session.startDate,
  endDate: session.endDate,
  location: {
    '@type': 'Place',
    name: session.location.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: session.location.address,
      postalCode: session.location.zipcode,
      addressLocality: session.location.city,
      addressCountry: 'FR',
    },
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Tarif inter-entreprise',
      description:
        'Assistez à une session de formation avec maximum 10 élèves.',
      category: 'Primary',
      price: `${training.interPrice}`,
      priceCurrency: 'EUR',
      url: completeUrl(training.link),
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
  performers: trainers.map(trainer => trainerLd({ trainer }, { id: true })),
})
