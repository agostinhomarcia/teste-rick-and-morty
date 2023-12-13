import React from "react";
import { View, Text, Image } from "react-native";
import { CharacterDetails } from "../../types/types";

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
    <View>
      <Image
        source={{ uri: character.image }}
        style={{ width: 200, height: 200 }}
      />
      <Text>Name: {character.name}</Text>
      <Text>Status: {character.status}</Text>
      <Text>Species: {character.species}</Text>
      <Text>Episode: {character.episode}</Text>
      <Text>Location: {character.location}</Text>
    </View>
  );
};

export default CharacterDetail;
