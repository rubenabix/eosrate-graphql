const controller = require('./Rating.controller')

const resolveFunctions = {
  Query: {
    ratings (_, params = {}, context) {
      return controller.getRatings()
    },
    blockProducers (_, params = {}, context) {
      return controller.getBlockProducers()
    }
  },
  Mutation: {}
}

module.exports = resolveFunctions
