import { Platform, StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import { Slot, Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

const MainLayout = () => {
  return (
    <>
      <StatusBar translucent barStyle="dark-content" />

      <SafeAreaView edges={["top"]} style={{ flex: 1, paddingTop: 8 }}>
        <Tabs
          screenOptions={{
            tabBarStyle: styles.container,
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "gray",
          }}
        >
          <Tabs.Screen
            name="cart"
            options={{
              title: "Cart",
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <FontAwesome
                  name="shopping-cart"
                  size={20}
                  color={focused ? "white" : "gray"}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="categories"
            options={{
              title: "Categories",
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <FontAwesome
                  name="list"
                  size={20}
                  color={focused ? "white" : "gray"}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="home"
            options={{
              title: "",
              headerShown: false,
              tabBarIcon: () => (
                <View style={styles.home}>
                  <FontAwesome name="home" size={36} color="white" />
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="favorites"
            options={{
              title: "Favorites",
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <FontAwesome
                  name="heart"
                  size={20}
                  color={focused ? "white" : "gray"}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="me"
            options={{
              title: "Me",
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <FontAwesome
                  name="user"
                  size={20}
                  color={focused ? "white" : "gray"}
                />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </>
  );
};

export default MainLayout;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#38220F",
    paddingHorizontal: 8,
    paddingVertical: 6,
    paddingBottom: 24,
  },
  home: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#967259",
    width: Platform.OS == "ios" ? 70 : 80,
    height: Platform.OS == "ios" ? 70 : 80,
    top: -20,
    borderRadius: 999,
  },
});
