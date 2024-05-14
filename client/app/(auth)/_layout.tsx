import { Image, StatusBar, Text, View, StyleSheet } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthLayout = () => {
  return (
    <>
      <StatusBar translucent barStyle="light-content" />

      <View style={styles.container}>
        <Image
          source={require("@/assets/images/auth-thumbnail.png")}
          style={styles.image}
        />
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.title}>Hyper Coffee</Text>
          <Slot />
        </SafeAreaView>
      </View>
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECE0D1",
    position: "relative",
  },
  image: {
    position: "absolute",
    transform: [{ translateY: -40 }],
  },
  safeArea: {
    alignItems: "center",
  },
  title: {
    marginVertical: 48,
    fontSize: 36,
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },
});
