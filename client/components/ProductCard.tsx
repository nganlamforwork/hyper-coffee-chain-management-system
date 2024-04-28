import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome6, Fontisto } from "@expo/vector-icons";

interface ProductCardProps {}

const ProductCard = ({}: ProductCardProps) => {
  return (
    <View
      style={styles.container}
      className={`relative min-w-[140px] rounded-3xl p-4 bg-white`}
    >
      <Image
        src="https://www.starbucks.vn/media/iebnrg1m/hazelnut-macchiato_tcm89-24778_w1024_n.jpg"
        className="w-[62px] h-[62px] rounded-full mb-2"
      />
      <Text className="text-[16px] font-bold mb-2">Iced Black Coffee</Text>
      <Text className="text-[14px] font-bold mb-2">$1.4</Text>
      <View className="flex-row items-center">
        <Fontisto name="star" size={16} color="#FFE147" />
        <Text className="text-[10px] ml-1">4.4</Text>
      </View>
      <TouchableOpacity className="absolute bg-[#967259] p-4 rounded-tl-3xl rounded-br-3xl bottom-0 right-0">
        <FontAwesome6 name="plus" size={12} color="#E8E9F1" />
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    shadowColor: "#A9A9A9",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 1,
  },
});
