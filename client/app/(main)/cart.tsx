import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Checkbox from "expo-checkbox";
import OrderCard from "@/components/OrderCard";
import PaymentFooter from "@/components/PaymentFooter";
import { Animated } from "react-native";
import { useCartStore } from "@/store/cart";
import { AntDesign } from "@expo/vector-icons";

interface CartProps {
  // onCheckboxClick: (value: boolean) => void;
  navigation: any;
}

const Cart: React.FC<CartProps> = ({ navigation }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { items } = useCartStore();

  const [toggleSelectAll, setToggleSelectAll] = useState(false);

  const [footerAnim] = useState(new Animated.Value(0));

  const startAnimation = () => {
    Animated.timing(footerAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (selectedItems.length >= 1) {
      footerAnim.setValue(0); // reset position
      startAnimation();
    }
  }, [selectedItems]);

  const handleReset = () => {
    setSelectedItems([]);
  };
  const handleChange = (productId: string) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(productId)
        ? prevSelectedItems.filter((id) => id !== productId)
        : [...prevSelectedItems, productId]
    );
  };
  const handleToggleSelectAll = () => {
    if (toggleSelectAll) setSelectedItems([]);
    else {
      const newSelectedItems = items.map((item) => item.product.id);
      setSelectedItems(newSelectedItems);
    }

    setToggleSelectAll(!toggleSelectAll);
  };
  const deleteItem = (productId: string) => {
    useCartStore.getState().deleteItem(productId);
  };
  return (
    <>
      <View style={styles.ContentContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <Text
            style={{ width: 0, flexGrow: 1, textAlign: "center" }}
            className="font-bold text-[24px] text-[#1F2024]"
          >
            Cart
          </Text>
          {selectedItems.length > 0 && (
            <TouchableOpacity onPress={handleReset}>
              <Text className="font-bold text-[12px] text-[#967259]">
                Cancel
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Text className="mb-2 text-[14px]">
          You have{" "}
          <Text className="font-bold text-[#967259]">
            {items.length} item{items.length > 1 && "s"}
          </Text>{" "}
          in your cart
        </Text>
        {selectedItems.length > 0 && (
          <Animated.View
            style={{
              opacity: footerAnim, // Apply the opacity animation
            }}
          >
            <View style={styles.line} />
            <View style={{ flexDirection: "row" }} className="my-4">
              <Checkbox
                className="mr-4 w-4 h-4 border border-[#967259] rounded"
                value={toggleSelectAll}
                onValueChange={() => handleToggleSelectAll()}
                color="#967259"
              />
              <Text className="text-[14px] text-[#38220F]">
                {toggleSelectAll ? "Unchoose All" : "Choose All"}
              </Text>
            </View>
          </Animated.View>
        )}

        <ScrollView showsVerticalScrollIndicator={false} className="pt-1">
          <View className="flex gap-4">
            {items &&
              items.map((item) => (
                <View className="flex-row items-center">
                  <Checkbox
                    className="mr-4 w-4 h-4 border border-[#967259] rounded"
                    value={selectedItems.includes(item.product.id)}
                    onValueChange={() => handleChange(item.product.id)}
                    color="#967259"
                  />
                  <OrderCard
                    product={item.product}
                    extras={item.extras}
                    quantity={item.quantity}
                  />

                  <TouchableOpacity
                    onPress={() => deleteItem(item.product.id)}
                    className="ml-3 w-6 h-6 rounded-3xl bg-[#ECE0D1] justify-center items-center"
                  >
                    <AntDesign
                      name="delete"
                      size={14}
                      className="text-destructive"
                    />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </ScrollView>
      </View>

      {selectedItems.length > 0 && (
        <Animated.View
          style={{
            opacity: footerAnim, // Apply the opacity animation
          }}
        >
          <PaymentFooter
            buttonTitle="Pay"
            price={{ price: "0", currency: "$" }}
            quantity={4}
            navigation={navigation}
          />
        </Animated.View>
      )}
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({
  ContentContainer: {
    flex: 1,
    backgroundColor: "#f8f9fe",
    padding: 27,
  },
  line: {
    borderBottomColor: "#967259",
    borderBottomWidth: 1,
  },
});
