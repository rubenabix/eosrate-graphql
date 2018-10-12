```
query ratings {
  ratings {
    id
  }

}

query blockProducers {
  blockProducers {
    id
  }

}

query bpJSON {
  bpJSON {
    meta {
      elapsedTime
      generatedAt
      maintainer
    }
    producers {
      info {
        countryAlpha2
        countryName
        countryNumber
        rank
        votePercent
      }
      messageSummary {
        chain
        endpoint
        general
        org
        regproducer
      }
      input {
        nodes {
          location {
            country
            latitude
            longitude
            name
          }
        }
        org {
          branding {
            logo1024
            logo256
            logoSvg
          }
          candidateName
          codeOfConduct
          email
          location {
            country
            latitude
            longitude
            name
          }
          ownershipDisclosure
          social {
            facebook
            github
            keybase
            reddit
            steemit
            telegram
            twitter
            wechat
            youtube
          }
        }
        producerAccountName
        producerPublicKey
      }
      regproducer {
        isActive
        lastClaimTime
        location
        owner
        producerKey
        totalVotes
        unpaidBlocks
        url
      }
    }
  }
}
```
