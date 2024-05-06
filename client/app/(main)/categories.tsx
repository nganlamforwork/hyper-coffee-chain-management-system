import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { categoriesData } from "@/constants/home";
import ProductCard from "@/components/ProductCard";

const ProductCardAddToCart = ({
}: any) => {
  ToastAndroid.showWithGravity(
    'Coffee is Added to Cart',
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
};

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  const renderItem = () => {
    return (
      <View style={styles.itemContainer}>
        <ProductCard buttonPressHandler={ProductCardAddToCart}/>
      </View>
    );
  };

  return (
    <>
      <View className="mx-6 flex-row justify-between mb-4">
        <View className="w-[42px]"></View>
        <Text className="font-bold text-[24px] text-[#1F2024]">Categories</Text>
        <TouchableOpacity className="w-[42px] h-[42px] rounded-full bg-[#ECE0D180] bg-opacity-50 justify-center items-center">
          <EvilIcons name="search" size={25} color="black" />
        </TouchableOpacity>
      </View>

      <Text className="text-[#666666] ml-6 mb-4">Select a category</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="ml-6 mb-6 min-h-[36px]"
      >
        {categoriesData.map((item) => (
          <TouchableOpacity
            key={item.id}
            className={`justify-center items-center mr-2 px-4 py-2 rounded-full bg-[#ECE0D1] ${
              activeCategory === item.id ? "bg-[#967259]" : ""
            }`}
            onPress={() => setActiveCategory(item.id)}
          >
            <Text
              className={`text-[14px] text-[#2F3036] ${
                activeCategory === item.id ? "text-[#E8E9F1]" : ""
              }`}
            >
              {item.content}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        numColumns={2}
        columnWrapperStyle={{ gap: 16, padding: 8 }}
        contentContainerStyle={styles.flatListContainer}
        data={[...Array(9).keys()]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        d
      />
    </>
  );
};

export default Categories;

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  itemContainer: {
    flex: 1,
  },
});
