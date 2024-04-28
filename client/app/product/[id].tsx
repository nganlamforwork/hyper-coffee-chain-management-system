import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

const ProductDetail = () => {
  const [text, setText] = useState("");

  const router = useRouter();
  const params = useLocalSearchParams();

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      console.log("No route to go back to");
    }
  };
  const handleHeartPress = () => {
    console.log("Heart button pressed");
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Stack Screen */}
      <Stack.Screen
        options={{
          title: "Product detail #" + params.id,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTransparent: true,
          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={goBack}>
              <View style={styles.backButton}>
                <Feather name="chevron-left" size={24} color="white" />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleHeartPress}>
              <View style={styles.backButton}>
                <Feather name="heart" size={20} color="white" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.content}>
        {/* Image with Overlay */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://file.hstatic.net/1000075078/article/blog_f80b599183c340bca744c174e7ab2af8.jpg",
            }}
            style={styles.imageBackground}
            resizeMode="cover"
          />
          {/* Black Overlay */}
          <View style={styles.overlay} />
        </View>
        <ScrollView>
          <View style={{ padding: 16, gap: 16, paddingBottom: 100 }}>
            <Text style={styles.productPageTitle}>Description</Text>
            <Text style={{ fontSize: 14 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Text>
            <Text style={styles.productPageTitle}>Coffee Size</Text>
            <CoffeeSizeSelector />
            <Text style={styles.productPageTitle}>Sugar</Text>
            <SugarSelector />
            <Text style={styles.productPageTitle}>Temperature</Text>
            <TemperatureSelector />
            <Text style={styles.productPageTitle}>Additional Notes</Text>
            <TextInput
              style={styles.input}
              multiline={true}
              numberOfLines={4}
              onChangeText={setText}
              value={text}
              placeholder="Type your note here"
            />

            <QuantitySelector />
          </View>
        </ScrollView>
        <AddToCartButton />
      </View>
    </View>
  );
};
const CoffeeSizeSelector = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 24,
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      <View style={styles.buttonSizeItem}>
        <TouchableOpacity style={styles.sizeButton}>
          <Feather name="coffee" size={30} color="#38220F" />
        </TouchableOpacity>
        <Text style={styles.buttonTitle}>Small</Text>
        <Text style={styles.buttonPrice}>$0.0</Text>
      </View>
      <View style={styles.buttonSizeItem}>
        <TouchableOpacity style={styles.sizeButton}>
          <Feather name="coffee" size={40} color="#38220F" />
        </TouchableOpacity>
        <Text style={styles.buttonTitle}>Medium</Text>
        <Text style={styles.buttonPrice}>$0.0</Text>
      </View>
      <View style={styles.buttonSizeItem}>
        <TouchableOpacity style={styles.sizeButton}>
          <Feather name="coffee" size={50} color="#38220F" />
        </TouchableOpacity>
        <Text style={styles.buttonTitle}>Large</Text>
        <Text style={styles.buttonPrice}>$0.0</Text>
      </View>
    </View>
  );
};

const SugarSelector = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 16,
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      <TouchableOpacity style={styles.sizeButton}>
        <Text style={styles.buttonTitle}>Free</Text>
        <Text style={styles.buttonPrice}>0%</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sizeButton}>
        <Text style={styles.buttonTitle}>Less</Text>
        <Text style={styles.buttonPrice}>50%</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sizeButton}>
        <Text style={styles.buttonTitle}>Normal</Text>
        <Text style={styles.buttonPrice}>70%</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sizeButton}>
        <Text style={styles.buttonTitle}>High</Text>
        <Text style={styles.buttonPrice}>100%</Text>
      </TouchableOpacity>
    </View>
  );
};

const TemperatureSelector = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 16,
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      <TouchableOpacity style={styles.sizeButton}>
        <Text style={styles.buttonTitle}>Hot</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sizeButton}>
        <Text style={styles.buttonTitle}>Cold</Text>
      </TouchableOpacity>
    </View>
  );
};
const QuantitySelector = () => {
  return (
    <View
      className="flex-row items-center"
      style={{ gap: 4, justifyContent: "center" }}
    >
      <TouchableOpacity className="p-1 rounded-3xl bg-[#ECE0D1] justify-center items-center">
        <Feather name="minus" size={20} color="black" />
      </TouchableOpacity>
      <Text
        className="mx-1 text-[14px] text-[#1F2024]"
        style={{ fontSize: 20 }}
      >
        1
      </Text>
      <TouchableOpacity className="p-1 rounded-3xl bg-[#ECE0D1] justify-center items-center">
        <Feather name="plus" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const AddToCartButton = () => {
  return (
    <TouchableOpacity style={styles.addToCartButton}>
      <Text style={styles.addToCartPrice}>$5.49</Text>
      <Text style={styles.addToCartText}>Add to Cart</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backButton: {
    backgroundColor: "rgba(236, 224, 209, 0.3)",
    borderRadius: 999,
    padding: 4,
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    height: 36,
  },
  imageContainer: {
    width: "100%",
    height: 300,
    position: "relative",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  productPageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#38220F",
    textAlign: "center",
  },
  sizeButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ECE0D1",
    borderRadius: 8,
    padding: 16,
  },
  buttonSizeItem: {
    alignItems: "center",
    gap: 8,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#38220F",
  },
  buttonPrice: {
    fontSize: 14,
    color: "#967259",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 16,
    minHeight: 100,
  },
  addToCartButton: {
    backgroundColor: "#38220F",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    bottom: 20,
    left: 24,
    right: 24,
  },
  addToCartPrice: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  addToCartText: {
    color: "white",
    fontSize: 14,
  },
});

export default ProductDetail;
