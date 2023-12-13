import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./src/api/api";
import HomeScreen from "./src/screens/HomeScreen";
import { StatusBar } from "react-native";

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <StatusBar barStyle="light-content" backgroundColor="#ccc" translucent />
    <HomeScreen />
  </ApolloProvider>
);

export default App;
