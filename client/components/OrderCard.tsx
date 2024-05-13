import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Extra, Product } from "@/type";

interface OrderCardProps {
  product: Product;
  price: number;
  extras: Extra[];
  quantity: number;
  note?: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  product,
  price,
  extras,
  quantity,
}) => {
  const increaseQuantity = () => {};

  const decreaseQuantity = () => {
    if (quantity > 1) {
      // Decrease quantity logic here
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product?.imageUrl }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product?.name}</Text>
        {extras.map((item, index) => (
          <Text key={index} style={styles.extraName}>
            {item.name}
          </Text>
        ))}
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={decreaseQuantity}
          style={styles.quantityButton}
        >
          <AntDesign name="minus" size={12} color="black" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          onPress={increaseQuantity}
          style={styles.quantityButton}
        >
          <AntDesign name="plus" size={12} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#A9A9A9",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {},
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#38220F",
    marginBottom: 5,
  },
  extraName: {
    fontSize: 10,
    color: "#38220F",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#967259",
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECE0D1",
    borderRadius: 10,
    marginRight: 5,
  },
  quantityText: {
    fontSize: 14,
    color: "#1F2024",
    marginHorizontal: 5,
  },
});

export default OrderCard;
