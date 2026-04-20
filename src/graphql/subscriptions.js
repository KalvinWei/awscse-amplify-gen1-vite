/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePublicAnnouncement = /* GraphQL */ `
  subscription OnCreatePublicAnnouncement(
    $filter: ModelSubscriptionPublicAnnouncementFilterInput
  ) {
    onCreatePublicAnnouncement(filter: $filter) {
      id
      message
      postedAt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePublicAnnouncement = /* GraphQL */ `
  subscription OnUpdatePublicAnnouncement(
    $filter: ModelSubscriptionPublicAnnouncementFilterInput
  ) {
    onUpdatePublicAnnouncement(filter: $filter) {
      id
      message
      postedAt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePublicAnnouncement = /* GraphQL */ `
  subscription OnDeletePublicAnnouncement(
    $filter: ModelSubscriptionPublicAnnouncementFilterInput
  ) {
    onDeletePublicAnnouncement(filter: $filter) {
      id
      message
      postedAt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTrip = /* GraphQL */ `
  subscription OnCreateTrip(
    $filter: ModelSubscriptionTripFilterInput
    $owner: String
  ) {
    onCreateTrip(filter: $filter, owner: $owner) {
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
export const onUpdateTrip = /* GraphQL */ `
  subscription OnUpdateTrip(
    $filter: ModelSubscriptionTripFilterInput
    $owner: String
  ) {
    onUpdateTrip(filter: $filter, owner: $owner) {
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
export const onDeleteTrip = /* GraphQL */ `
  subscription OnDeleteTrip(
    $filter: ModelSubscriptionTripFilterInput
    $owner: String
  ) {
    onDeleteTrip(filter: $filter, owner: $owner) {
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
export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote(
    $filter: ModelSubscriptionNoteFilterInput
    $owner: String
  ) {
    onCreateNote(filter: $filter, owner: $owner) {
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
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote(
    $filter: ModelSubscriptionNoteFilterInput
    $owner: String
  ) {
    onUpdateNote(filter: $filter, owner: $owner) {
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
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote(
    $filter: ModelSubscriptionNoteFilterInput
    $owner: String
  ) {
    onDeleteNote(filter: $filter, owner: $owner) {
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
export const onCreatePhoto = /* GraphQL */ `
  subscription OnCreatePhoto(
    $filter: ModelSubscriptionPhotoFilterInput
    $owner: String
  ) {
    onCreatePhoto(filter: $filter, owner: $owner) {
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
export const onUpdatePhoto = /* GraphQL */ `
  subscription OnUpdatePhoto(
    $filter: ModelSubscriptionPhotoFilterInput
    $owner: String
  ) {
    onUpdatePhoto(filter: $filter, owner: $owner) {
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
export const onDeletePhoto = /* GraphQL */ `
  subscription OnDeletePhoto(
    $filter: ModelSubscriptionPhotoFilterInput
    $owner: String
  ) {
    onDeletePhoto(filter: $filter, owner: $owner) {
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
