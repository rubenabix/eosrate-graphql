module.exports = `
type Rating {
  id: String
}

type BlockProducerBranding {
 logo256: String
 logo1024: String
 logoSvg: String
}

type BlockProducerLocation {
  name: String
  country: String
  latitude: Float
  longitude: Float
}

type BlockProducerSocial {
  steemit: String
  twitter: String
  youtube: String
  facebook: String
  github: String
  reddit: String
  keybase: String
  telegram: String
  wechat: String
}

type BlockProducerOrganization {
  candidateName: String
  website: String
  codeOfConduct: String
  ownershipDisclosure: String
  email: String
  branding: BlockProducerBranding
  location: BlockProducerLocation
  social: BlockProducerSocial
}

type BlockProducerNode {
  location: BlockProducerLocation
  nodeType: String
  p2pEndpoint: String
  apiEndpoint: String
  sslEndpoint: String
  bnetEndpoint: String
}

type BlockProducerDetails {
  producerAccountName: String
  producerPublicKey: String
  nodes: [BlockProducerNode] 
}

type BlockProducer {
  owner: String
  totalVotes: String
  producerKey: String
  isActive: Float
  url: String
  unpaidBlocks: Float
  lastClaimTime: Float
  location: Float
  details: BlockProducerDetails
}

type Query {
  ratings: [Rating]
  blockProducers: [BlockProducer]
}

type Mutation {
  changeRatings: [Rating]
}
`
