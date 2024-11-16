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

interface AnimatedLinkProps {
  href: string;
  iconName: string;
  label: string;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  href,
  iconName,
  label,
}) => {
  const backgroundColor = useSharedValue("transparent");

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });

  const handlePressIn = () => {
    backgroundColor.value = withTiming("rgba(0, 0, 255, 0.9)", {
      duration: 200,
    });
  };

  const handlePressOut = () => {
    backgroundColor.value = withTiming("transparent", { duration: 200 });
  };

  return (
    <Link href={href} asChild>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.link}
      >
        <Animated.View style={[styles.linkContent, animatedStyle]}>
          <Ionicons name={iconName as any} size={24} color="black" />
          <Text style={styles.linkText}>{label}</Text>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

export default function Profile() {
  const router = useRouter();

  function setName(text: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{ fontSize: 32, marginBottom: 20 }}>Profile</Text>
      <View style={styles.values}>
        <View style={styles.valueContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} onChangeText={setName} />
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} onChangeText={setName} />
        </View>
        {/*         <Text style={{ fontSize: 18, color: "blue" }}>Sign Up</Text> */}
      </View>
      <AnimatedLink href="/Sign Up" iconName="person-add" label="Sign Up" />
      <View style={styles.separator} />
      <Button
        color={"#000"}
        title="homescreen go"
        onPress={() => router.push("/")}
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
