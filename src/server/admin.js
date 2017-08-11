import express from 'express'
import objection from 'objection'
import ObjectionRest from 'objection-rest'
import bodyParser from 'body-parser'
import Trainer from 'server/models/Trainer'
import Training from 'server/models/Training'
import * as database from 'server/services/database'
import path from 'path'

const app = express()

app.use(bodyParser.json())
database.connect()

ObjectionRest(objection)
  .routePrefix('/api')
  .pluralizer(x => x)
  .addModel(Trainer)
  .addModel(Training)
  .generate(app)

app.use(express.static(path.join(__dirname, '../../public-admin/dist')))
app.listen(3000)
