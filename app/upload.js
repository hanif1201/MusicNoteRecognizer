import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { recognizeNotesFromPDF } from "../services/noteRecognition";
import { uploadFile } from "../services/appwrite";

export default function UploadScreen() {
  const navigation = useNavigation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [recognizedNotes, setRecognizedNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size='large' color='#6200ee' />
      ) : (
        <TouchableOpacity style={styles.uploadButton} onPress={pickPDF}>
          <Text style={styles.uploadButtonText}>Select PDF</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
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
