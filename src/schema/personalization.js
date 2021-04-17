import { gql } from "apollo-server";

export const personalizationTypeDefs = gql`
  enum PersonalizationType {
    ARTISTS
    TRACKS
  }

  enum TimeRange {
    SHORT
    MEDIUM
    LONG
  }

  input PersonalizationInput {
    type: PersonalizationType!
    time_range: TimeRange
    limit: Int
    offset: Int
  }

  union PersonalizedResponse = SimplifiedTrack | SimplifiedArtist

  type PersonalizationQueries {
    getPersonalizedData(payload: PersonalizationInput): [PersonalizedResponse]
      @source(name: "getPersonalizedData")
  }

  extend type Query {
    personalizationQueries: PersonalizationQueries
  }
`;
