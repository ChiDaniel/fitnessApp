import { StyleSheet, View, Text } from "react-native";

type ValueProps = {
  label: string;
  value: string;
};

const Value: React.FC<ValueProps> = ({ label, value }) => {
  return (
    <View style={styles.valueContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  valueContainer: {
    // flex: 1,
    // alignItems: "center",
    marginVertical: 10,
    minWidth: "40%",
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
});

export default Value;
