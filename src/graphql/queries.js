/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPublicAnnouncement = /* GraphQL */ `
  query GetPublicAnnouncement($id: ID!) {
    getPublicAnnouncement(id: $id) {
      id
      message
      postedAt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPublicAnnouncements = /* GraphQL */ `
  query ListPublicAnnouncements(
    $filter: ModelPublicAnnouncementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPublicAnnouncements(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        message
        postedAt
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTrip = /* GraphQL */ `
  query GetTrip($id: ID!) {
    getTrip(id: $id) {
      id
      title
      destination
      startDate
      endDate
      notes {
        nextToken
        __typename
      }
      photos {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listTrips = /* GraphQL */ `
  query ListTrips(
    $filter: ModelTripFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrips(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        destination
        startDate
        endDate
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      tripID
      body
      createdAt
      updatedAt
      tripNotesId
      owner
      __typename
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tripID
        body
        createdAt
        updatedAt
        tripNotesId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const notesByTripID = /* GraphQL */ `
  query NotesByTripID(
    $tripID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notesByTripID(
      tripID: $tripID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tripID
        body
        createdAt
        updatedAt
        tripNotesId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPhoto = /* GraphQL */ `
  query GetPhoto($id: ID!) {
    getPhoto(id: $id) {
      id
      tripID
      s3Key
      caption
      createdAt
      updatedAt
      tripPhotosId
      owner
      __typename
    }
  }
`;
export const listPhotos = /* GraphQL */ `
  query ListPhotos(
    $filter: ModelPhotoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPhotos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tripID
        s3Key
        caption
        createdAt
        updatedAt
        tripPhotosId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const photosByTripID = /* GraphQL */ `
  query PhotosByTripID(
    $tripID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPhotoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    photosByTripID(
      tripID: $tripID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tripID
        s3Key
        caption
        createdAt
        updatedAt
        tripPhotosId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
