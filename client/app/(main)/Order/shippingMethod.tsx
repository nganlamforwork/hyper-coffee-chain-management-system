import PaymentHeader from "@/components/PaymentComponent/PaymentHeader";
import Radio from "@/components/PaymentComponent/Radio";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface ShippingMethodProps {
  navigation: any; // replace 'any' with your navigation prop type
}

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];
const options = [
  {
    label: "Standard Shipping",
    value: "standard",
    description: "Delivery in 5-7 business days",
    price: 0.5,
  },
  {
    label: "Express Shipping",
    value: "express",
    description: "Delivery in 2-3 business days",
    price: 1,
  },
  {
    label: "Next Day Shipping",
    value: "next_day",
    description: "Delivery by tomorrow",
    price: 0,
  },
];

const ShippingMethod: React.FC<ShippingMethodProps> = ({ navigation }) => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [ship, setShip] = useState<string | null>(options[0].value);

  // const [currentPosition, setCurrentPosition] = useState(0);

  const router = useRouter();
  const renderLabel = () => {
    if (value || isFocus) {
      return <Text style={[isFocus && { color: "blue" }]}>Dropdown label</Text>;
    }
    return null;
  };
  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      console.log("No route to go back to");
    }
  };
  return (
    <View style={styles.container}>
      {/* Stack Screen */}
      <Stack.Screen
        options={{
          title: "Shipping Method",
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
        }}
      />
      <ScrollView>
        <View style={styles.container}>
          <PaymentHeader state={0} />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.contentComponent}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.title}>Address</Text>
            </View>
            <View>
              <TextInput style={styles.input} placeholder="Receiver's name" />
              <TextInput
                style={styles.input}
                placeholder="Receiver's phone number"
              />
              <TextInput
                style={styles.inputDetail}
                multiline
                numberOfLines={4}
                placeholder="Address detail"
              />
            </View>
          </View>

          {/* <View style={styles.contentComponent}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.title}>Shipping Method</Text>
            </View>
            <View>
              <Radio
                options={options}
                checkedValue={ship || ""}
                onChange={setShip}
                style={{ backgroundColor: "match-parent" }}
              />
            </View>
          </View> */}
          <View style={styles.contentComponent}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.title}>Additional Notes</Text>
            </View>
            <View style={styles.inputDetail}>
              <TextInput
                multiline
                numberOfLines={4}
                placeholder="Add notes for shipper here"
                style={{ height: 100, borderColor: "gray" }}
                textAlignVertical="top" // Add this line
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonContinue}
            onPress={() => {
              navigation.navigate("Payment");
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "400",
                fontSize: 14,
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShippingMethod;

const styles = StyleSheet.create({
  container: {},
  gradient: {
    width: Dimensions.get("window").width,
    height: 225,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    justifyContent: "center",
    gap: 15,
  },
  contentComponent: {
    gap: 16,
  },
  cardStyle: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  contentContainer: {
    padding: 25,
    gap: 16,
  },
  buttonContinue: {
    backgroundColor: "#967259",
    borderRadius: 16,
    justifyContent: "center",
    marginBottom: 20,
    paddingVertical: 16,
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
});
