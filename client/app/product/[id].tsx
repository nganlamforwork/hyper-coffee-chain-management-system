import React, { useState, useMemo } from "react";
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
import Checkbox from "expo-checkbox";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { ExtraGroups, Product } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/config/axios";

const ProductDetail = () => {
  const [text, setText] = useState("");

  const router = useRouter();
  const params = useLocalSearchParams();

  const { data: product } = useQuery({
    queryKey: ["product"],
    queryFn: () =>
      axiosInstance
        .get(`/get-product/${params.id}`)
        .then((res) => res.data.product),
  });

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
          title: product?.name,
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
              uri: product?.imageUrl,
            }}
            style={styles.imageBackground}
            resizeMode="cover"
          />
          {/* Black Overlay */}
          <View style={styles.overlay} />
        </View>
        <ScrollView className="w-full">
          <View
            style={{
              padding: 24,
              gap: 24,
              paddingBottom: 100,
            }}
          >
            <Text style={styles.productPageTitle}>Description</Text>
            <Text style={{ fontSize: 14 }}>{product?.description}</Text>
            <>
              {product?.extraGroups?.length &&
                product.extraGroups.map((item) => {
                  return <ExtraSection key={item.id} extraItem={item} />;
                })}
            </>
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

const ExtraSection = ({ extraItem }: { extraItem: ExtraGroups }) => {
  const radio = extraItem?.min == extraItem?.max;

  const [current, setCurrent] = useState("test");
  return (
    <View>
      <View className="flex flex-row gap-2 items-end">
        <Text style={styles.productPageTitle} className="leading-none">
          {extraItem?.name}
        </Text>
        <Text className="leading-none text-slate-600">
          {extraItem?.type == "optional" ? "Optional," : "Must,"}
          {radio
            ? ` max ${extraItem?.max}`
            : ` min ${extraItem?.min}, max ${extraItem?.max}`}
        </Text>
      </View>
      {radio ? (
        <RadioButtonGroup
          containerStyle={{
            marginTop: 12,
            display: "flex",
            gap: 8,
            width: "100%",
          }}
          size={20}
          selected={current}
          onSelected={(value: string) => setCurrent(value)}
          radioBackground="green"
        >
          {extraItem?.extras?.map((item) => (
            <RadioButtonItem
              value={item.id}
              label={
                <View className="flex-row justify-between gap-2">
                  <Text className="font-medium">{item.name}</Text>
                  <Text className="text-slate-600">${item.price}</Text>
                </View>
              }
            />
          ))}
        </RadioButtonGroup>
      ) : (
        <View style={{ marginTop: 12, display: "flex", gap: 8 }}>
          {extraItem?.extras?.map((item) => (
            <View className="flex-row justify-between ">
              <View className="flex flex-row gap-2">
                <Checkbox className="w-4 h-4 border border-[#967259] rounded" />
                <Text className="font-medium">{item.name}</Text>
              </View>
              <Text className="text-slate-600">${item.price}</Text>
            </View>
          ))}
        </View>
      )}
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
