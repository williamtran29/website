import { ApolloClient } from 'react-apollo'

/* eslint-disable no-underscore-dangle */
export default new ApolloClient({
  initialState: typeof window === 'object' && {
    apollo: window.__PRELOADED_STATE__.apollo,
  },
})
/* eslint-enable no-underscore-dangle */
