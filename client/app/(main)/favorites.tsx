import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";

const Favorites = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  const renderItem = () => {
    return (
      <View style={styles.itemContainer}>
        <ProductCard />
      </View>
    );
  };

  return (
    <>
      <View className="mx-6 flex-row justify-center mb-4">
        <Text className="font-bold text-[24px] text-[#1F2024]">Favorites</Text>
      </View>

      <FlatList
        numColumns={2}
        columnWrapperStyle={{ gap: 16, padding: 8 }}
        contentContainerStyle={styles.flatListContainer}
        data={[...Array(9).keys()]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  itemContainer: {
    flex: 1,
  },
});
