/* eslint-disable import/no-extraneous-dependencies */
import Knex from 'knex'
import { truncate } from 'knex-scripts'
import knexConfig from '../knexfile'

exports.seed = async () => {
  const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])
  await truncate({ getKnex: () => knex })
}
