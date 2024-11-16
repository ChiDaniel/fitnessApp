import React, { createContext, useState, ReactNode } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Appearance } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "@/components/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";
import Animated, { LinearTransition } from "react-native-reanimated";

/* const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
}); */

export default function Settings() {
  const [theme, setTheme] = useState(Appearance.getColorScheme() || "light");
  const isLightTheme = theme === "light";
  //const isDarkTheme = theme === "dark";

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    /*     DarkTheme.colors = {
      ...DarkTheme.colors,
      background: "#000",
      text: "#fff",
    };
    DefaultTheme.colors = {
      ...DefaultTheme.colors,
      background: "#fff",
      text: "#000",
    }; */
  };

  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        {/* <Animated.View
          layout={LinearTransition.springify().damping(80).stiffness(200)}
           key={index}
        > */}
        <Text style={{ fontSize: 32, marginBottom: 20 }}>Settings</Text>
        <StatusBar style="auto" />
        <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
          <FontAwesome
            name={isLightTheme ? "sun-o" : "moon-o"}
            size={24}
            color={isLightTheme ? "black" : "gray"}
          />
          <Text
            style={[
              styles.themeToggleText,
              isLightTheme ? styles.lightText : styles.darkText,
              //isLightTheme ? styles.lightContainer : styles.darkContainer,
              //isLightTheme ? { backgroundColor: "black" } : { backgroundColor: "white" },
            ]}
          >
            {isLightTheme ? "Switch to Dark Mode" : "Switch to Light Mode"}
          </Text>
        </TouchableOpacity>
        <View style={styles.separator} />

        {/*         <Button
          title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          onPress={toggleTheme}
        /> */}

        <Button title="homescreen go" onPress={() => router.push("/")} />
        {/* </Animated.View> */}
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //color: "black",
    // backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    padding: 14,
  },

  separator: {
    marginVertical: 180,
    height: 1,
    width: "100%",
  },

  value: {
    fontSize: 24,
    color: "#ccc",
  },

  valueContainer: {
    // flex: 1,
    // alignItems: "center",
    marginVertical: 10,
    minWidth: "40%",
  },

  lightContainer: {
    backgroundColor: "white",
  },
  darkContainer: {
    backgroundColor: "black",
    //width: "100%",
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  lightText: {
    color: "black",
  },
  darkText: {
    color: "gray",
  },
  themeToggle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginTop: 20,
  },
  themeToggleText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
