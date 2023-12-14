import React, { useState } from "react";
import { View, FlatList, Modal, Button, Text, Image } from "react-native";
import { gql, useQuery } from "@apollo/client";
import CharacterListItem from "../components/List/CharacterListItem";
import { Container, SearchInput, LoadingText } from "./styles";
import { useModal } from "../utils/modalUtils";
import { Character } from "../types/types";

const HomeScreen: React.FC = () => {
  const [characterName, setCharacterName] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const { isOpen, openModal, closeModal } = useModal();

  const handleCharacterSelection = (character: any) => {
    setSelectedCharacter(character);
    openModal();
  };

  const GET_CHARACTERS = gql`
    query GetCharacters {
      characters(page: 2, filter: { name: "Morty" }) {
        info {
          count
        }
        results {
          id
          name
          image
        }
      }
    }
  `;

  const GET_CHARACTER_DETAILS = gql`
    query GetCharacterDetails($id: ID!) {
      character(id: $id) {
        id
        name
        status
        species
        location {
          id
          name
        }
      }
    }
  `;

  const { loading, data } = useQuery(GET_CHARACTERS);

  const { loading: detailsLoading, data: characterDetails } = useQuery(
    GET_CHARACTER_DETAILS,
    {
      variables: { id: selectedCharacter?.id || "" },
      skip: !selectedCharacter,
    }
  );

  return (
    <Container>
      <SearchInput
        placeholder="Nome do Personagem"
        value={characterName}
        onChangeText={(text: any) => setCharacterName(text)}
      />

      {loading ? (
        <LoadingText>Loading...</LoadingText>
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data?.characters.results || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <CharacterListItem
                character={item}
                onPress={() => handleCharacterSelection(item)}
              />
            );
          }}
        />
      )}

      <Modal visible={isOpen} animationType="slide">
        <View>
          {selectedCharacter && (
            <View>
              <Image
                source={{ uri: selectedCharacter.image }}
                style={{ width: 150, height: 150 }}
              />
              <Text>Name: {selectedCharacter.name}</Text>

              {detailsLoading ? (
                <LoadingText>Loading character details...</LoadingText>
              ) : (
                <>
                  <Text>Status: {characterDetails?.character.status}</Text>
                  <Text>Species: {characterDetails?.character.species}</Text>
                  <Text>
                    Location: {characterDetails?.character.location?.name}
                  </Text>
                </>
              )}
            </View>
          )}
          <Button title="Fechar" onPress={closeModal} />
        </View>
      </Modal>
    </Container>
  );
};

export default HomeScreen;
