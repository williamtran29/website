import { truncateAll } from 'server/dbUtils'

exports.seed = async knex => truncateAll(knex)
