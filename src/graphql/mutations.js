/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPublicAnnouncement = /* GraphQL */ `
  mutation CreatePublicAnnouncement(
    $input: CreatePublicAnnouncementInput!
    $condition: ModelPublicAnnouncementConditionInput
  ) {
    createPublicAnnouncement(input: $input, condition: $condition) {
      id
      message
      postedAt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePublicAnnouncement = /* GraphQL */ `
  mutation UpdatePublicAnnouncement(
    $input: UpdatePublicAnnouncementInput!
    $condition: ModelPublicAnnouncementConditionInput
  ) {
    updatePublicAnnouncement(input: $input, condition: $condition) {
      id
      message
      postedAt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePublicAnnouncement = /* GraphQL */ `
  mutation DeletePublicAnnouncement(
    $input: DeletePublicAnnouncementInput!
    $condition: ModelPublicAnnouncementConditionInput
  ) {
    deletePublicAnnouncement(input: $input, condition: $condition) {
      id
      message
      postedAt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTrip = /* GraphQL */ `
  mutation CreateTrip(
    $input: CreateTripInput!
    $condition: ModelTripConditionInput
  ) {
    createTrip(input: $input, condition: $condition) {
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
export const updateTrip = /* GraphQL */ `
  mutation UpdateTrip(
    $input: UpdateTripInput!
    $condition: ModelTripConditionInput
  ) {
    updateTrip(input: $input, condition: $condition) {
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
export const deleteTrip = /* GraphQL */ `
  mutation DeleteTrip(
    $input: DeleteTripInput!
    $condition: ModelTripConditionInput
  ) {
    deleteTrip(input: $input, condition: $condition) {
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
export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
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
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
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
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
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
export const createPhoto = /* GraphQL */ `
  mutation CreatePhoto(
    $input: CreatePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    createPhoto(input: $input, condition: $condition) {
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
export const updatePhoto = /* GraphQL */ `
  mutation UpdatePhoto(
    $input: UpdatePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    updatePhoto(input: $input, condition: $condition) {
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
export const deletePhoto = /* GraphQL */ `
  mutation DeletePhoto(
    $input: DeletePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    deletePhoto(input: $input, condition: $condition) {
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
