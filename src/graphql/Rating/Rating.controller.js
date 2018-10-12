const db = require('./../../db/volatile')

const getRatings = () => {
  return [
    {
      id: '1'
    }
  ]
}
const getBPJSON = async () => {
  const blockProducers = await db.getBPJSON()
  return blockProducers || {}
}
module.exports = {
  getRatings,
  getBPJSON
}
