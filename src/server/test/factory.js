/* eslint-disable import/no-extraneous-dependencies */

import { factory } from 'factory-girl'
import ObjectionAdapter from 'server/test/ObjectionAdapter'
import Training from 'server/models/Training'

factory.setAdapter(new ObjectionAdapter())

factory.define('training', Training, {
  rank: factory.sequence('training.rank'),
  title: factory.chance('last'),
  abstract: factory.chance('sentence'),
  description: factory.chance('paragraph'),
  objectives: factory.chance('paragraph'),
  prerequisites: factory.chance('paragraph'),
  icon: factory.chance('word'),
  slug: factory.chance('word'),
  live: true,
})

export default factory
