// CharacterDetail.tsx

import React from "react";
import { View, Text } from "react-native";
import { CharacterDetails } from "../../types/types";
import { StyledImage, StyledText, StyledView } from "./styles";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER_DETAILS } from "../../graphql/graphql";

interface CharacterDetailProps {
  character: CharacterDetails;
  id: string;
}

const CharacterDetail: React.FC<CharacterDetailProps> = (props) => {
  const { character, id } = props;
  const { loading, error, data } = useQuery(GET_CHARACTER_DETAILS, {
    variables: { id: id },
  });

  if (loading) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error || !data || !data.character) {
    return (
      <View>
        <Text>Erro ao carregar detalhes do personagem.</Text>
      </View>
    );
  }

  const characterData = data.character;
  console.log(data);

  return (
    <StyledView>
      <StyledImage
        source={{ uri: characterData.image }}
        style={{ width: 200, height: 200 }}
      />
      <StyledText>Name: {characterData.name}</StyledText>
      <StyledText>Status: {characterData.status}</StyledText>
      <StyledText>Species: {characterData.species}</StyledText>
    </StyledView>
  );
};

export default CharacterDetail;
