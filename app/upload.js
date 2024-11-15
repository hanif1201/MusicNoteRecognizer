import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function UploadScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Upload Screen</Text>
      <Button
        title='Go to Results'
        onPress={() => navigation.navigate("Results")}
      />
    </View>
  );
}
