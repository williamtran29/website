/* eslint-disable react/sort-comp */
import { COMPONENT_IDS } from './constants'
import { getComponent } from './componentTracker'

async function loadComponents() {
  const ids = window[COMPONENT_IDS] || []
  return Promise.all(ids.map(id => getComponent(id).load()))
}

export default loadComponents
