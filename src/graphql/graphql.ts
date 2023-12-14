// src/graphql.ts
import { gql } from "@apollo/client";
import { Character, CharacterDetails } from "../types/types";

export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters(page: 2, filter: { name: "Morty" }) {
      info {
        count
      }
      results {
        name
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }
`;
export type { Character, CharacterDetails };
