import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome6, Fontisto } from "@expo/vector-icons";
import { Product } from "@/type";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants/route";

interface ProductCardProps {
  product?: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const handleRenderProductName = (name?: string) => {
    if (name) {
      return product && product?.name?.length > 18
        ? product?.name.substring(0, 16 - 3) + "..."
        : product?.name;
    } else return "Double Espresso";
  };

  return (
    <TouchableOpacity
      style={[styles.container, styles.card]}
      onPress={() => {
        product &&
          router.push({
            pathname: `${ROUTES.PRODUCT}/${product?.id}`,
          });
      }}
    >
      <Image
        source={{
          uri:
            product?.imageUrl ||
            "https://res.cloudinary.com/dckbae28z/image/upload/v1714978999/products/lypx6b9pn7nxjnwihrs5.webp",
        }}
        style={styles.image}
      />
      <Text style={styles.productName}>
        {handleRenderProductName(product?.name)}
      </Text>
      <Text style={styles.productPrice}>${product?.price || 2.53}</Text>
      <View style={styles.ratingContainer}>
        <Fontisto name="star" size={16} color="#FFE147" />
        <Text style={styles.ratingText}>{4.5}</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <FontAwesome6 name="plus" size={12} color="#E8E9F1" />
      </TouchableOpacity>
    </TouchableOpacity>
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
  card: {
    position: "relative",
    minWidth: 140,
    borderRadius: 24, // 3xl in Tailwind
    padding: 16, // 4 in Tailwind
    backgroundColor: "#FFFFFF", // bg-white in Tailwind
    marginBottom: 16, // Custom spacing if needed
  },
  image: {
    width: 62,
    height: 62,
    borderRadius: 31, // half of the width/height for a rounded-full effect
    marginBottom: 8, // 2 in Tailwind
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8, // 2 in Tailwind
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8, // 2 in Tailwind
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 10,
    marginLeft: 4, // 1 in Tailwind
  },
  addButton: {
    position: "absolute",
    backgroundColor: "#967259", // Custom color
    padding: 16, // 4 in Tailwind
    borderTopLeftRadius: 24, // tl-3xl in Tailwind
    borderBottomRightRadius: 24, // br-3xl in Tailwind
    bottom: 0,
    right: 0,
  },
});
