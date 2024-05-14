import { Feather } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
interface ThankProps {
  navigation: any;
}

const Thank: React.FC<ThankProps> = ({ navigation }) => {
  const router = useRouter();
  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      console.log("No route to go back to");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerTransparent: true,
          headerTintColor: "black",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          headerStyle: {
            backgroundColor: "#f8f9fe",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={goBack} style={{ marginLeft: 24 }}>
              <Feather name="chevron-left" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.contentContainer}>
        <Image source={require("../../../assets/images/success.png")} />
        <View>
          <Text
            style={{
              color: "#000",
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Thanks for giving us your feedback!
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonBackToHome}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "400",
              fontSize: 16,
            }}
          >
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Thank;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  buttonBackToHome: {
    backgroundColor: "#967259",
    borderRadius: 16,
    justifyContent: "center",
    paddingVertical: 16,
    width: "100%",
  },
});
