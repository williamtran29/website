/* eslint-disable import/no-extraneous-dependencies */

import { factory } from 'factory-girl'
import ObjectionAdapter from 'server/test/ObjectionAdapter'
import Path from 'server/models/Path'
import Training from 'server/models/Training'

factory.setAdapter(new ObjectionAdapter())

factory.define('path', Path, {
  rank: factory.sequence('path.rank'),
  title: factory.chance('last'),
  color: factory.chance('color'),
  icon: factory.chance('word'),
})

factory.define('course', Path, {
  title: factory.chance('last'),
  outline: factory.chance('paragraph'),
  path_id: factory.assoc('path', 'id'),
})

factory.define('training', Training, {
  rank: factory.sequence('training.rank'),
  title: factory.chance('last'),
  abstract: factory.chance('sentence'),
  description: factory.chance('paragraph'),
  objectives: factory.chance('paragraph'),
  prerequisites: factory.chance('paragraph'),
  icon: factory.chance('word'),
  slug: factory.chance('word'),
  path_id: factory.assoc('path', 'id'),
  live: true,
})

export default factory
