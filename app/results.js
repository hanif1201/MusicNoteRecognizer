import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ResultsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Results Screen</Text>
      <Button title='Go to Home' onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
