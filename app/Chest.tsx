import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

export default function Chest() {
  const router = useRouter();

  function setName(text: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{ fontSize: 32, marginBottom: 20 }}>Chest exercices</Text>
      <View style={styles.values}>
        <View style={styles.valueContainer}>
          <Text style={styles.label}>Weight</Text>
          <TextInput style={styles.input} onChangeText={setName} />
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.label}>Height</Text>
          <TextInput style={styles.input} onChangeText={setName} />
        </View>
        {/*         <Text style={{ fontSize: 18, color: "blue" }}>Sign Up</Text> */}
      </View>
      <View style={styles.separator} />
      <Button
        color={"#000"}
        title="start build"
        onPress={() => router.push("/two")}
      />
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

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    //paddingHorizontal: 20,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    //borderRadius: 5,
    //backgroundColor: "#1E90FF",
  },
  linkText: {
    marginLeft: 5,
    fontSize: 18,
  },
  linkContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: "100%",
  },
  separator: {
    marginVertical: 180,
    height: 1,
    width: "100%",
  },
});
