import React from "react";
import { View, Text, Image } from "react-native";
import { CharacterDetails } from "../../types/types";
import { StyledImage, StyledText, StyledView } from "./styles";

interface CharacterDetailProps {
  character: CharacterDetails;
}

const CharacterDetail: React.FC<CharacterDetailProps> = (props) => {
  const { character } = props;

  if (
    !character.status ||
    !character.species ||
    !character.episode ||
    !character.location
  ) {
    return (
      <View>
        <Text>Detalhes do personagem não disponíveis.</Text>
      </View>
    );
  }

  return (
    <StyledView>
      <StyledImage
        source={{ uri: character.image }}
        style={{ width: 200, height: 200 }}
      />
      <StyledText>Name: {character.name}</StyledText>
      <StyledText>Status: {character.status}</StyledText>
      <StyledText>Species: {character.species}</StyledText>
      <StyledText>Episode: {character.episode}</StyledText>
      <StyledText>Location: {character.location}</StyledText>
    </StyledView>
  );
};

export default CharacterDetail;
