/* eslint-disable import/no-extraneous-dependencies */
import { truncate } from 'knex-scripts'

exports.seed = async knex => truncate({ getKnex: () => knex })
