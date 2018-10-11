const Redis = require('ioredis')

let client

// TODO: remove
const config = {
  REDIS_HOST: 'redis-17300.c61.us-east-1-3.ec2.cloud.redislabs.com',
  REDIS_PORT: '17300',
  REDIS_PASSWORD: 'Ubkhb4H2xW2Mx4L4d1ZINpsJ94tztG1o'
}

const getClient = async () => {
  if (!client) {
    console.log('CREATE REDIS CLIENT', {
      host: config.REDIS_HOST,
      port: config.REDIS_PORT,
      password: config.REDIS_PASSWORD,
      showFriendlyErrorStack: true,
      db: 0,
      keyPrefix: 'RATE_'
    })
    client = new Redis({
      host: config.REDIS_HOST,
      port: config.REDIS_PORT,
      password: config.REDIS_PASSWORD,
      showFriendlyErrorStack: true,
      db: 0,
      keyPrefix: 'RATE_'
    })
  }
  return client
}

const addBlockProducer = async ({blockProducer, container, id}) => {
  const client = await getClient()
  await client.hset([`BLOCKS:${container}`, id, JSON.stringify(blockProducer)])
}

const getBlockProducers = async () => {
  const client = await getClient()
  let blockProducers = await client.hgetall(['BLOCKS:LAST'])
  console.log('blockProducers', blockProducers)
  if (!blockProducers) {
    return []
  }
  const blocks = []
  console.log('')
  for (let key in blockProducers) {
    blocks.push(JSON.parse(blockProducers[key]))
  }
  console.log('blocks', blocks)
  return blocks
}

module.exports = {
  getBlockProducers,
  addBlockProducer
}
