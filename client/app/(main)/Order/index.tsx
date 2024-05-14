import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useRef, useState } from "react";
import Checkbox from "expo-checkbox";
import OrderCard from "@/components/OrderCard";
import PaymentFooter from "@/components/PaymentFooter";
import { Animated } from "react-native";
import { useCartStore } from "@/store/cart";
import { AntDesign } from "@expo/vector-icons";
import { useOrderStore } from "@/store/order";
import { Stack } from "expo-router";

interface CartProps {
  navigation: any;
}

const Cart: React.FC<CartProps> = ({ navigation }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);
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

    const { quantity, totalPrice } = items.reduce(
      (acc, item) => {
        if (selectedItems.includes(item.product.id)) {
          acc.quantity += item.quantity;
          acc.totalPrice += item.price;
        }
        return acc;
      },
      { quantity: 0, totalPrice: 0 }
    );

    setSelectedQuantity(quantity);
    setSelectedPrice(totalPrice);
  }, [selectedItems, items]);

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
  const handlePay = () => {
    const selectedItemsDetails = items.filter((item) =>
      selectedItems.includes(item.product.id)
    );
    useOrderStore.getState().updateItems(selectedItemsDetails, selectedPrice);
    // navigation.navigate('PaymentPage');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Cart",
          headerTransparent: false,
          headerTintColor: "black",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          headerStyle: {
            backgroundColor: "#f8f9fe",
          },
          headerLeft: () => <></>,
          headerRight: () => (
            <TouchableOpacity
              disabled={selectedItems.length <= 0}
              style={{ marginRight: 24 }}
              onPress={handleReset}
            >
              <Text
                style={{
                  fontFamily: "Font-Bold",
                  fontSize: 14,
                  color: selectedItems.length > 0 ? "#967259" : "transparent",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.infoText}>
          You have{" "}
          <Text style={styles.infoBoldText}>
            {items.length} item{items.length > 1 ? "s" : ""}
          </Text>{" "}
          in your cart
        </Text>
        {selectedItems.length > 0 && (
          <Animated.View style={{ opacity: footerAnim }}>
            <View style={styles.line} />
            <View style={styles.selectAllContainer}>
              <Checkbox
                value={toggleSelectAll}
                onValueChange={() => handleToggleSelectAll()}
                color="#967259"
              />
              <Text style={styles.selectAllText}>
                {toggleSelectAll ? "Unchoose All" : "Choose All"}
              </Text>
            </View>
          </Animated.View>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.orderCardContainer}>
            {items &&
              items.map((item) => (
                <View style={styles.orderCardRow}>
                  <Checkbox
                    value={selectedItems.includes(item.product.id)}
                    onValueChange={() => handleChange(item.product.id)}
                    color="#967259"
                  />
                  <OrderCard
                    product={item.product}
                    price={item.price}
                    extras={item.extras}
                    quantity={item.quantity}
                  />

                  <TouchableOpacity
                    onPress={() => deleteItem(item.product.id)}
                    style={styles.deleteButton}
                  >
                    <AntDesign
                      name="delete"
                      size={14}
                      style={styles.deleteIcon}
                    />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </ScrollView>
      </View>

      {selectedItems.length > 0 && (
        <Animated.View style={{ opacity: footerAnim }}>
          <PaymentFooter
            buttonTitle="Pay"
            price={{
              price: selectedPrice.toFixed(2).toString(),
              currency: "$",
            }}
            quantity={selectedQuantity}
            navigation={navigation}
            onPay={handlePay}
          />
        </Animated.View>
      )}
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "#f8f9fe",
    padding: 27,
  },
  headerText: {
    width: 0,
    flexGrow: 1,
    textAlign: "center",
    fontFamily: "Font-Bold",
    fontSize: 24,
    color: "#1F2024",
    fontWeight: "bold",
  },
  infoText: {
    marginBottom: 2,
    fontFamily: "Font-Regular",
    fontSize: 14,
    color: "#38220F",
  },
  infoBoldText: {
    fontFamily: "Font-Bold",
    color: "#967259",
  },
  line: {
    borderBottomColor: "#967259",
    borderBottomWidth: 1,
    marginTop: 16,
  },
  selectAllContainer: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 16,
    gap: 16,
  },
  selectAllText: {
    fontFamily: "Font-Regular",
    fontSize: 14,
    color: "#38220F",
  },
  scrollView: {
    paddingTop: 1,
  },
  orderCardContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 16,
    marginTop: 4,
  },
  orderCardRow: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  deleteButton: {
    marginLeft: 3,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteIcon: {
    color: "#DE3C4B",
  },
});
