import Knex from 'knex'
import { Model } from 'objection'
import config from 'server/config'
import knexConfig from '../../../knexfile'

// Cache knex connection
let knex
export function connect() {
  if (!knex) {
    knex = Knex(knexConfig[config.get('env')])
    Model.knex(knex)
  }

  return knex
}

export async function disconnect() {
  return new Promise((resolve, reject) => {
    if (!knex) {
      resolve()
      return
    }

    knex.destroy(error => {
      if (error) {
        reject(error)
      } else {
        knex = null
        resolve()
      }
    })
  })
}
