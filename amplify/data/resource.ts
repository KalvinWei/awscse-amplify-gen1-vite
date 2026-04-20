import { defineData } from '@aws-amplify/backend';

const schema = `type Trip @model @auth(rules: [{allow: owner}, {allow: groups, groups: ["admin"]}]) {
  id: ID!
  title: String!
  destination: String!
  startDate: AWSDate
  endDate: AWSDate
  notes: [Note] @hasMany
  photos: [Photo] @hasMany
}

type Note @model @auth(rules: [{allow: owner}, {allow: groups, groups: ["admin"]}]) {
  id: ID!
  tripID: ID! @index(name: "byTrip")
  body: String!
}

type Photo @model @auth(rules: [{allow: owner}, {allow: groups, groups: ["admin"]}]) {
  id: ID!
  tripID: ID! @index(name: "byTrip")
  s3Key: String!
  caption: String
}

type PublicAnnouncement @model @auth(rules: [{allow: public}]) {
  id: ID!
  message: String!
  postedAt: AWSDateTime
}
`;

export const data = defineData({
  migratedAmplifyGen1DynamoDbTableMappings: [
    {
      //The "branchname" variable needs to be the same as your deployment branch if you want to reuse your Gen1 app tables
      branchName: 'gen2-main',
      modelNameToTableNameMapping: {
        Trip: 'Trip-dmjvgceabng3zjqge4vhrzwzdi-main',
        Note: 'Note-dmjvgceabng3zjqge4vhrzwzdi-main',
        Photo: 'Photo-dmjvgceabng3zjqge4vhrzwzdi-main',
        PublicAnnouncement:
          'PublicAnnouncement-dmjvgceabng3zjqge4vhrzwzdi-main',
      },
    },
  ],
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
  schema,
});
