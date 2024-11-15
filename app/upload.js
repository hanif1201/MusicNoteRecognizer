import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

const UploadScreen = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processingStage, setProcessingStage] = useState(null);

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (!result.canceled) {
        const selectedFile = result.assets[0];
        setFile(selectedFile);
      }
    } catch (error) {
      console.error("File selection error:", error);
    }
  };

  const processFile = async () => {
    if (!file) return;

    setLoading(true);
    try {
      // Stage 1: Read File
      setProcessingStage("Reading file...");
      const fileContent = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Stage 2: Validate File
      setProcessingStage("Validating file...");
      if (fileContent.length === 0) {
        throw new Error("Empty file");
      }

      // Stage 3: Prepare for Upload
      setProcessingStage("Preparing upload...");
      const fileInfo = {
        name: file.name,
        size: fileContent.length,
        type: file.mimeType,
        base64: fileContent,
      };

      // Stage 4: Simulate Server Upload
      setProcessingStage("Uploading to server...");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Stage 5: Process Complete
      setProcessingStage("Processing complete!");

      // Reset or handle next steps
      setTimeout(() => {
        setProcessingStage(null);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Processing error:", error);
      setProcessingStage("Processing failed");
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={handleUpload} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Select PDF</Text>
      </TouchableOpacity>

      {file && (
        <View style={styles.fileInfoContainer}>
          <Text style={styles.fileInfoTitle}>Selected File:</Text>
          <Text>Name: {file.name}</Text>
          <Text>Size: {file.size} bytes</Text>
          <Text>Type: {file.mimeType}</Text>

          <TouchableOpacity
            onPress={processFile}
            style={styles.processButton}
            disabled={loading}
          >
            <Text style={styles.processButtonText}>
              {loading ? "Processing..." : "Process File"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {loading && processingStage && (
        <View style={styles.processingContainer}>
          <ActivityIndicator size='large' color='#0000ff' />
          <Text style={styles.processingText}>{processingStage}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  uploadButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: "white",
    textAlign: "center",
  },
  fileInfoContainer: {
    width: "100%",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 20,
  },
  fileInfoTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  processButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  processButtonText: {
    color: "white",
    textAlign: "center",
  },
  processingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  processingText: {
    marginLeft: 10,
    color: "#666",
  },
});

export default UploadScreen;
