import { axiosInstance } from "@/config/axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";

interface FeedbackProps {
  navigation: any;
  route?: any;
}

const likeAboutOption = [
  "Delicious",
  "Quickly Arrived",
  "Staff Friendly",
  "Good quantity",
  "Variety Options",
];

const improveOption = [
  "Fast Service",
  "Hotline Order",
  "Seperated Ice Options",
];

const Feedback: React.FC<FeedbackProps> = ({ navigation, route }) => {
  const orderId = route.params.orderId;
  const [chosenLikeAboutOptions, setChosenLikeAboutOptions] = useState<
    Array<string>
  >([]);
  const [chosenImproveOptions, setChosenImproveOptions] = useState<
    Array<string>
  >([]);
  const sendFeedback = async () => {
    try {
      const feedbackData = {
        rating: 5.0,
        message: "sample message",
        orderId: orderId,
      };

      const response = await axiosInstance.post("/send-feedback", feedbackData);

      if (response?.data?.success) {
        console.log("Feedback sent successfully!");

        navigation.navigate("Thank");
      } else {
        console.error("Failed to send feedback:", response?.data?.message);
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };
  const toggleLikeAboutOption = (option: string) => {
    setChosenLikeAboutOptions((prevState) =>
      prevState.includes(option)
        ? prevState.filter((item) => item !== option)
        : [...prevState, option]
    );
  };

  const toggleImproveOption = (option: string) => {
    setChosenImproveOptions((prevState) =>
      prevState.includes(option)
        ? prevState.filter((item) => item !== option)
        : [...prevState, option]
    );
  };

  return (
    <View style={styles.contentContainer}>
      <Text
        style={{
          color: "#000",
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Feedback Order
      </Text>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>
          Your order is finised.
        </Text>
        <Text style={{ fontSize: 14, color: "#71727A" }}>
          How would you rate the order?
        </Text>
        <AirbnbRating
          // style={{ paddingVertical: 10 }}
          showRating={false}
          starImage={require("../../../assets/images/star.png")}
          starContainerStyle={{ paddingTop: 10, alignSelf: "flex-start" }}
          size={20}
        />
      </View>
      <View>
        <Text style={{ fontSize: 14, fontWeight: "700" }}>
          What did you like about it?
        </Text>
        <View style={styles.optionContainer}>
          {likeAboutOption.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={
                chosenLikeAboutOptions.includes(item)
                  ? styles.chooseOption
                  : styles.unchooseOption
              }
              onPress={() => toggleLikeAboutOption(item)}
            >
              <Text
                style={
                  chosenLikeAboutOptions.includes(item)
                    ? styles.chooseTextOption
                    : styles.unchooseTextOption
                }
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 14, fontWeight: "700" }}>
          What could be improved?
        </Text>
        <View style={styles.optionContainer}>
          {improveOption.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={
                chosenImproveOptions.includes(item)
                  ? styles.chooseOption
                  : styles.unchooseOption
              }
              onPress={() => toggleImproveOption(item)}
            >
              <Text
                style={
                  chosenImproveOptions.includes(item)
                    ? styles.chooseTextOption
                    : styles.unchooseTextOption
                }
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 14, fontWeight: "700", marginBottom: 10 }}>
          Anything else?
        </Text>
        <View style={styles.cardStyle}>
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
        style={styles.buttonSubmit}
        onPress={() => sendFeedback()}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "400",
            fontSize: 16,
          }}
        >
          Give Feedback
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 30,
    flex: 1,
    gap: 10,
  },
  buttonSubmit: {
    backgroundColor: "#967259",
    borderRadius: 16,
    justifyContent: "center",
    paddingVertical: 16,
    width: "100%",
  },
  cardStyle: {
    paddingTop: 10,
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
  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chooseOption: {
    backgroundColor: "#967259",
    alignSelf: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  chooseTextOption: {
    color: "#fff",
  },
  unchooseOption: {
    backgroundColor: "#ECE0D1",
    alignSelf: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  unchooseTextOption: {
    color: "#967259",
  },
});
