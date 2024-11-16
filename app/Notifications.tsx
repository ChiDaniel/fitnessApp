import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

export default function Notifications() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{ fontSize: 32, marginBottom: 20 }}>Notifications</Text>
      <Button title="homescreen go" onPress={() => router.push("/")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    padding: 14,
  },
  values: {
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
  },

  label: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },

  value: {
    fontSize: 24,
    color: "#333",
  },

  valueContainer: {
    // flex: 1,
    // alignItems: "center",
    marginVertical: 10,
    minWidth: "40%",
  },
});
