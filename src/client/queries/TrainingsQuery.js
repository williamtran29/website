import { gql } from 'react-apollo'

const TrainingsQuery = {
  fragments: {
    trainingEssential: gql`
      fragment TrainingEssential on Training {
        slug
        title
        longTitle
        abstract
        icon
        link
        duration
        interPrice
        path {
          id
          color
        }
      }
    `,
  },
}

export default TrainingsQuery
