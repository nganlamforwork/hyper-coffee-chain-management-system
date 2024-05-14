import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ROUTES } from "@/constants/route";

const OnboardingScreen = () => {
  return (
    <>
      <StatusBar translucent barStyle="light-content" />

      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/onboard.png")}
            alt="Onboard"
            style={styles.image}
          />
        </View>

        <LinearGradient
          style={styles.linearGradient}
          colors={["#967259", "#38220F"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.mainText}>
                Coffee so good, your taste buds will love it.
              </Text>
              <Text style={styles.subText}>
                The best grain, the finest roast, the powerful flavor.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.replace(ROUTES.LOGIN)}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  imageContainer: {
    height: "60%",
    backgroundColor: "black",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  linearGradient: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 50,
    paddingVertical: 24,
  },
  textContainer: {
    width: "100%",
    maxWidth: "70%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  mainText: {
    fontSize: 34,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  subText: {
    fontSize: 14,
    color: "#A9A9A9",
    textAlign: "center",
  },
  button: {
    position: "absolute",
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: "#967259",
    paddingVertical: 16,
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});
