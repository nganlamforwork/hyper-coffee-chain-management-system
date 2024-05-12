import {
  Image,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Extra, Product } from "@/type";

interface OrderCardProps {
  product: Product;
  extras: Extra[];
  quantity: number;
  note?: string;
}

const OrderCard: React.FC<OrderCardProps> = ({ product, extras, quantity }) => {
  const increaseQuantity = () => {};

  const decreaseQuantity = () => {
    if (quantity > 1) {
    }
  };

  return (
    <>
      <View
        style={styles.container}
        className="flex-1 p-3 flex-row justify-between items-center bg-white rounded-xl gap-2"
      >
        <Image
          source={{
            uri: product?.imageUrl,
          }}
          className="w-[64px] h-[64px] rounded-full"
        />
        <View className="flex-col justify-between gap-1">
          <Text className="text-[14px] font-bold text-[#38220F]">
            {product?.name}
          </Text>
          <View>
            {extras &&
              extras.map((item) => (
                <Text className="text-[10px] text-[#38220F]">{item.name}</Text>
              ))}
          </View>
          <Text className="text-[#967259] font-bold text-[16px]">
            ${product?.price}
          </Text>
        </View>
        <View className="flex-row items-center gap-1">
          <TouchableOpacity
            onPress={decreaseQuantity}
            className="w-4 h-4 rounded-3xl bg-[#ECE0D1] justify-center items-center"
          >
            <AntDesign name="minus" size={12} color="black" />
          </TouchableOpacity>
          <Text className="mx-1 text-[14px] text-[#1F2024] text-center">
            {quantity}
          </Text>
          <TouchableOpacity
            onPress={increaseQuantity}
            className="w-4 h-4 rounded-3xl bg-[#ECE0D1] justify-center items-center"
          >
            <AntDesign name="plus" size={12} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    shadowColor: "#A9A9A9",
    shadowOffset: { width: 0, height: 0 }, // Dịch chuyển
    shadowOpacity: 0.5, // Độ trong suốt
    shadowRadius: 2, // Bán kính blur
    elevation: 1, // For Android
  },
});
