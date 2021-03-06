const fastify = require('fastify')
const customSchemas = require('./graphql')
const { graphiqlFastify, graphqlFastify } = require('fastify-graphql')
const { maskErrors } = require('graphql-errors')
const mongoose = require('mongoose')
const mongooseSchemas = require('./models/rate')
const { mergeSchemas } = require('graphql-tools')

// TODO: https://github.com/eoscostarica/rate.eoscostarica.io/issues/6#issuecomment-422244272
// const humanToCron = require('human-to-cron')
// const schedule = require('node-schedule')
// const eosCamelApi = require('@eoscostarica/eosjs-camel-api')

// const eosApi = eosCamelApi.getInstance()

// const syncProducers = async () => {
//   try {

//   } catch (err) {
//     console.log(err)
//   }
// }

// const timeInterval = humanToCron('once each second')
// const SyncProducersJob = schedule.scheduleJob(timeInterval, syncProducers)

maskErrors(customSchemas)

const app = fastify({
  logger: true
})

mongoose.connect(
  'mongodb://demo:demo1234@ds163402.mlab.com:63402/heroku_lcmbxdq5'
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
    app.log.info(`server listening on ${app.server.address().port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
