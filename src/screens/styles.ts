import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #ccc;
  margin-top: 30px;
  padding: 20px;
`;

export const SearchInput = styled.TextInput`
  height: 40px;
  border: 1px solid #fff;
  margin-bottom: 20px;
  padding: 5px;
  width: 180px;
`;

export const CloseButton = styled.Button`
  border-radius: 2px;
`;

export const LoadingText = styled.Text`
  margin-top: 10px;
`;

export const ModalContainer = styled.Modal`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  padding: 20px;
`;

export const ModalContent = styled.View`
  background-color: #ccc;
  border-radius: 10px;
  padding: 20px;
  margin-top: 55px;
`;

export const CharacterImage = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 75px;
  align-self: center;
  margin-bottom: 12px;
`;

export const CharacterDetailsText = styled.Text`
  margin-bottom: 10px;
  text-align: center;
  margin-top: 8px;
`;
