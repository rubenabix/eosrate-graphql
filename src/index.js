const fastify = require('fastify')
const customSchemas = require('./graphql')
const {graphiqlFastify, graphqlFastify} = require('fastify-graphql')
const {maskErrors} = require('graphql-errors')
const mongoose = require('mongoose')
const mongooseSchemas = require('./models/rate')
const {mergeSchemas} = require('graphql-tools')
const rp = require('request-promise')
const camelcaseKeysDeep = require('camelcase-keys-deep')
const util = require('util')
const db = require('./db/volatile')
const cuid = require('cuid')
const moment = require('moment')

// TODO: https://github.com/eoscostarica/rate.eoscostarica.io/issues/6#issuecomment-422244272
const humanToCron = require('human-to-cron')
const schedule = require('node-schedule')
// const eosCamelApi = require('@eoscostarica/eosjs-camel-api')
// const eosApi = eosCamelApi.getInstance()

const syncProducers = async () => {
  const date = moment().format('YYYY-MM-DD-HH-mm')
  const key = `${date}:${cuid()}`
  try {
    const bpJSON = camelcaseKeysDeep(await rp({
      uri: 'https://validate.eosnation.io/bps.json',
      json: true
    }))
    console.log('addBPJSON')
    await db.addBPJSON({
      bpJSON,
      key
    })
    console.log('updateLastReport')
    await db.updateLastReport({key})
  } catch (error) { }
}

// const timeInterval = humanToCron(process.env.SYNC_PRODUCERS_INTERVAL || 'once each 5 seconds')
// schedule.scheduleJob(timeInterval, syncProducers)

maskErrors(customSchemas)

const app = fastify({
  logger: true
})

mongoose.connect(
  'mongodb://demo:demo1234@ds163402.mlab.com:63402/heroku_lcmbxdq5',
  {
    useNewUrlParser: true
  }
)

app.register(graphqlFastify, {
  prefix: '/',
  graphql: {
    schema: mergeSchemas({
      schemas: [mongooseSchemas, customSchemas]
    })
  }
})

app.register(graphiqlFastify, {
  prefix: '/graphiql',
  graphiql: {
    endpointURL: '/'
  }
})

const start = async () => {
  try {
    console.log('init')
    await app.listen(3001)
    await syncProducers()
    app.log.info(`server listening on ${app.server.address().port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
