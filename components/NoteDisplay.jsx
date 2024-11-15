import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

const NoteDisplay = ({ notes }) => {
  return (
    <View style={styles.container}>
      {notes.length > 0 ? (
        notes.map((note, index) => (
          <Text key={index} style={styles.note}>
            {note}
          </Text>
        ))
      ) : (
        <Text style={styles.note}>No notes recognized.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  note: {
    fontSize: 18,
    color: Colors.black,
    marginVertical: 5,
  },
});

export default NoteDisplay;
