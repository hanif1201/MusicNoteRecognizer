import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import * as DocumentPicker from "expo-document-picker";
import { Colors } from "../constants/colors";

const FileUploader = ({ onFileSelected }) => {
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*", // Allow all file types
      copyToCacheDirectory: false,
    });

    if (result.type === "success") {
      onFileSelected(result);
    } else {
      alert("File selection was cancelled.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title='Pick a Document' onPress={pickDocument} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
});

export default FileUploader;
