import React from "react";
import { View, Text, Image } from "react-native";
import { CharacterDetails } from "../../types/types";
import { StyledImage, StyledText, StyledView } from "./styles";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER_DETAILS } from "../../graphql/graphql";

interface CharacterDetailProps {
  character: CharacterDetails;
}

const CharacterDetail: React.FC<CharacterDetailProps> = (props) => {
  const { character } = props;
  const { id } = useParams();
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

  return (
    <StyledView>
      <StyledImage
        source={{ uri: characterData.image }}
        style={{ width: 200, height: 200 }}
      />
      <StyledText>Name: {characterData.name}</StyledText>
      <StyledText>Status: {characterData.status}</StyledText>
      <StyledText>Species: {characterData.species}</StyledText>
      <StyledText>Episode: {characterData.episode}</StyledText>
      <StyledText>Location: {characterData.location}</StyledText>
    </StyledView>
  );
};

export default CharacterDetail;
function useParams(): { id: any } {
  throw new Error("Function not implemented.");
}
