declare module '*/graphql/queries' {
  export const listTrips: string
  export const getTrip: string
  export const listPublicAnnouncements: string
  export const getPublicAnnouncement: string
  export const listNotes: string
  export const listPhotos: string
}
declare module '*/graphql/mutations' {
  export const createTrip: string
  export const updateTrip: string
  export const deleteTrip: string
  export const createNote: string
  export const createPhoto: string
}
declare module '*/graphql/subscriptions' {}
