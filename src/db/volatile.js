const Redis = require('ioredis')
const EXPIRE_TIME_3H = 10800 // 24h in seconds
let client

// TODO: remove add secret manager to save credentials
const config = {
  REDIS_HOST: 'redis-17300.c61.us-east-1-3.ec2.cloud.redislabs.com',
  REDIS_PORT: '17300',
  REDIS_PASSWORD: 'Ubkhb4H2xW2Mx4L4d1ZINpsJ94tztG1o'
}

const getClient = async () => {
  if (!client) {
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

const addBPJSON = async ({key, bpJSON}) => {
  const client = await getClient()
  return client.setex([key, EXPIRE_TIME_3H, JSON.stringify(bpJSON)])
}

const updateLastReport = async ({key}) => {
  const redisClientInstance = await getClient()
  return redisClientInstance.set([`LAST_REPORT`, `${key}`])
}

const getBPJSON = async () => {
  const client = await getClient()
  const lastKey = await client.get([`LAST_REPORT`])
  if (!lastKey) {
    return undefined
  }
  const lastBPJSON = await client.get([lastKey])
  return lastBPJSON ? JSON.parse(lastBPJSON) : undefined
}

module.exports = {
  getBPJSON,
  addBPJSON,
  updateLastReport
}
