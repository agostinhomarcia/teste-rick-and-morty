import React, { useState } from "react";
import { View, FlatList, Modal, Button, Text, Image } from "react-native";
import { gql, useQuery } from "@apollo/client";
import CharacterListItem from "../components/List/CharacterListItem";
import {
  Container,
  SearchInput,
  LoadingText,
  ModalContainer,
  ModalContent,
  CharacterImage,
  CharacterDetailsText,
  CloseButton,
} from "./styles";
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
    query GetCharacters($name: String) {
      characters(page: 2, filter: { name: $name }) {
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

  const { loading, data } = useQuery(GET_CHARACTERS, {
    variables: { name: characterName },
  });

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
          numColumns={2} // Definir o número de colunas como 2
          columnWrapperStyle={{ justifyContent: "space-around" }}
          showsVerticalScrollIndicator={false}
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

      <ModalContainer visible={isOpen} animationType="slide">
        <ModalContent>
          {selectedCharacter && (
            <View>
              <CharacterImage
                source={{ uri: selectedCharacter.image }}
                style={{ width: 150, height: 150 }}
              />
              <CharacterDetailsText>
                👤 Name: {selectedCharacter.name}
              </CharacterDetailsText>

              {detailsLoading ? (
                <LoadingText>Loading character details...</LoadingText>
              ) : (
                <>
                  <CharacterDetailsText>
                    ✨Status: {characterDetails?.character.status}
                  </CharacterDetailsText>
                  <CharacterDetailsText>
                    ✅ Species: {characterDetails?.character.species}
                  </CharacterDetailsText>

                  <CharacterDetailsText>
                    🌍 Location: {characterDetails?.character.location?.name}
                  </CharacterDetailsText>
                </>
              )}
              <CloseButton title="Fechar" onPress={closeModal} />
            </View>
          )}
        </ModalContent>
      </ModalContainer>
    </Container>
  );
};

export default HomeScreen;
