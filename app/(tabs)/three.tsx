import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invite a friend page</Text>

      <Text style={styles.subTitle}>
        Share your progress and keep each other motivated
      </Text>
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
  subTitle: {
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 180,
    height: 1,
    width: "80%",
  },
});
