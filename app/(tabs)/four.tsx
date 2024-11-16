import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function TabFourScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutrition plan</Text>

      <Text style={styles.subTitle}>Get your personalized nutrition plan</Text>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  separator: {
    marginVertical: 180,
    height: 1,
    width: "80%",
  },
});
