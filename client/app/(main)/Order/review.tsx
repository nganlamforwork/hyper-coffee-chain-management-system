import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RadioPayment from "@/components/PaymentComponent/RadioPayment";
import { useOrderStore } from "@/store/order";
import OrderCard from "@/components/OrderCard";
import { axiosInstance } from "@/config/axios";

const options = [
  {
    label: "COD",
    value: "cod",
    image: null,
  },
];

interface ReviewProps {
  navigation: any; // replace 'any' with your navigation prop type
}

const Review: React.FC<ReviewProps> = ({ navigation }) => {
  const [payment, setPayment] = useState<string | null>(options[0].value);
  const { items, total } = useOrderStore();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [orderId, setOrderId] = useState(null);

  const createOrder = async () => {
    try {
      const orderData = {
        name: name,
        address: addressDetail,
        phoneNumber: phoneNumber,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          subTotal: item.price,
          note: item.note, // if available
        })),
        total: total,
      };

      const response = await axiosInstance.post(
        "/admin/create-order",
        orderData
      );

      if (response?.data?.success) {
        console.log("Order created successfully!");
        setOrderId(response.data.order.id); // Save the order ID
        navigation.navigate("SuccessOrder", {
          orderId: response.data.order.id,
        });
      } else {
        console.error("Failed to create order:", response?.data?.message);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.contentComponent}>
          <Text style={styles.headerText}>Review Order</Text>
          <Text style={styles.title}>Address</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Receiver's name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Receiver's phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TextInput
              style={styles.inputDetail}
              multiline
              numberOfLines={4}
              placeholder="Address detail"
              value={addressDetail}
              onChangeText={setAddressDetail}
            />
          </View>
        </View>
        <View style={styles.contentComponent}>
          <Text style={styles.title}>Payment Method</Text>
          <View>
            <RadioPayment
              options={options}
              checkedValue={payment || ""}
              onChange={setPayment}
              style={{ backgroundColor: "match-parent" }}
            />
          </View>
        </View>
        <View style={styles.contentComponent}>
          <Text style={styles.title}>Order Details</Text>
          <View style={styles.orderDetailsContainer}>
            {items.map((item) => (
              <View key={item.product.id} style={styles.orderItem}>
                <OrderCard
                  product={item.product}
                  price={item.price}
                  extras={item.extras}
                  quantity={item.quantity}
                />
              </View>
            ))}
          </View>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.title}>Total</Text>
          <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.buttonContinue} onPress={createOrder}>
          <Text style={styles.buttonText}>Place Order Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  headerText: {
    textAlign: "center",
    fontFamily: "Font-Bold",
    fontSize: 24,
    color: "#1F2024",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#f8f9fe",
    padding: 27,
    gap: 16,
  },
  contentComponent: {
    marginBottom: 16,
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "white",
    borderColor: "#C5C6CC",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  inputDetail: {
    borderColor: "#C5C6CC",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    minHeight: 100,
  },
  orderDetailsContainer: {
    flexDirection: "column",
    gap: 16,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  totalPrice: {
    fontSize: 20,
  },
  buttonContinue: {
    backgroundColor: "#967259",
    borderRadius: 16,
    justifyContent: "center",
    marginBottom: 20,
    paddingVertical: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 14,
  },
});

export default Review;
