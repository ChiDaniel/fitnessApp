import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface AnimatedLinkProps {
  href: string;
  iconName: string;
  label: string;
}

export default function TabTwoScreen() {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to your schedule</Text>
      <View style={styles.linksContainer}>
        <AnimatedLink href="/Back" iconName="barbell" label="Back" />
        <AnimatedLink href="/Arms" iconName="body" label="Arms" />
        <AnimatedLink href="/Legs" iconName="person" label="Legs" />
        <AnimatedLink href="/Chest" iconName="push" label="Chest" />
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    //paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
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
  separator: {
    marginVertical: 180,
    height: 1,
    width: "80%",
  },
});
