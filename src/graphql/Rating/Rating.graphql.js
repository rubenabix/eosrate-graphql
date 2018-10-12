module.exports = `

type Rating {
  id: String
}

type BlockInfo {
  countryAlpha2: String
  countryName: String
  countryNumber: String
  rank: Float
  votePercent: Float
}

type BlockMessageSummary {
  chain: String
  endpoint: String
  general: String
  org: String
  regproducer: String
}

type BlockLocation {
  country: String
  latitude: String
  longitude: String
  name: String
}

type BlockNode {
  location: BlockLocation
  nodeType: String
  apiEndpoint: String
  sslEndpoint: String
  p2pEndpoint: String
}

type BlockBranding {
  logo1024: String
  logo256: String
  logoSvg: String
}

type BlockSocial {
  facebook: String
  github: String
  keybase: String
  reddit: String
  steemit: String
  telegram: String
  twitter: String
  wechat: String
  youtube: String
}

type BlockOrg {
  branding: BlockBranding
  candidateName: String
  codeOfConduct: String
  email: String
  location: BlockLocation
  ownershipDisclosure: String
  social: BlockSocial
  website: String
}

type BlockInput {
  nodes: [BlockNode]
  org: BlockOrg
  producerAccountName: String
  producerPublicKey: String
}

type BlockRegproducer {
  isActive: Float
  lastClaimTime: Float
  location: Float
  owner: String
  producerKey: String
  totalVotes: Float
  unpaidBlocks: Float
  url: String
}

type Block {
  info: BlockInfo
  messageSummary: BlockMessageSummary
  input: BlockInput
  regproducer: BlockRegproducer
}

type MetadataBPJSON {
  elapsedTime: Float
  generatedAt: String
  maintainer: String
}

type BPJSON {
  meta: MetadataBPJSON
  producers: [Block]
}

type Query {
  ratings: [Rating]
  bpJSON: BPJSON
}

type Mutation {
  changeRatings: [Rating]
}
`
