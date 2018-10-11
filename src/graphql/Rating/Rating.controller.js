const db = require('./../../db/volatile')

const getRatings = () => {
  return [
    {
      id: '1'
    }
  ]
}
const getBlockProducers = async () => {
  const blockProducers = await db.getBlockProducers()
  return blockProducers || []
}
module.exports = {
  getRatings,
  getBlockProducers
}
