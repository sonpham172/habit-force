import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

export default function LoadingScreen({ message = "Loading..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});
