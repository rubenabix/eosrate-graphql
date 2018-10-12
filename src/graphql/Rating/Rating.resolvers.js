const controller = require('./Rating.controller')

const resolveFunctions = {
  Query: {
    ratings (_, params = {}, context) {
      return controller.getRatings()
    },
    bpJSON (_, params = {}, context) {
      return controller.getBPJSON()
    }
  },
  Mutation: {}
}

module.exports = resolveFunctions
