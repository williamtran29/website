/* eslint-disable import/no-extraneous-dependencies, global-require */
import { configure } from '@storybook/react'

function loadStories() {
  require('../src/stories')
}

configure(loadStories, module)
