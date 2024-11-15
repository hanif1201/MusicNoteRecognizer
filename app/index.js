import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <Image source={require("../assets/logo.png")} style={styles.logo} /> */}
      <Text style={styles.title}>Music Note Recognizer</Text>
      <Text style={styles.subtitle}>
        Automatically detect and annotate music notes from sheet music
      </Text>

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => navigation.navigate("Upload")}
      >
        <Text style={styles.uploadButtonText}>Upload Sheet Music</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  uploadButton: {
    backgroundColor: "#6200ee",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
