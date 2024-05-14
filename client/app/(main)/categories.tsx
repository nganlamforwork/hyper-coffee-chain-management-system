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
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/config/axios";
import { Category, Product } from "@/type";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState("");

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <View style={styles.itemContainer}>
        <ProductCard product={item} />
      </View>
    );
  };

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axiosInstance.get("/get-products").then((res) => res.data.products),
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axiosInstance.get("/get-categories").then((res) => res.data.categories),
  });

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.placeholderBox} />
        <Text style={styles.headerText}>Categories</Text>
        <TouchableOpacity style={styles.searchButton}>
          <EvilIcons name="search" size={25} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.selectCategoryText}>Select a category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        {categories &&
          categories.map((item: Category) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.categoryButton,
                activeCategory === item.id && styles.activeCategoryButton,
              ]}
              onPress={() => setActiveCategory(item.id)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  activeCategory === item.id && styles.activeCategoryButtonText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.flatListContainer}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

export default Categories;

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  placeholderBox: {
    width: 42,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2024",
  },
  searchButton: {
    width: 42,
    height: 42,
    borderRadius: 21, // Full rounded
    backgroundColor: "#ECE0D180",
    justifyContent: "center",
    alignItems: "center",
  },
  selectCategoryText: {
    color: "#666666",
    marginLeft: 24,
    marginBottom: 16,
  },
  categoryScroll: {
    marginLeft: 24,
    marginBottom: 24,
    maxHeight: 36,
  },
  categoryButton: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999, // Fully rounded
    backgroundColor: "#ECE0D1",
  },
  activeCategoryButton: {
    backgroundColor: "#967259",
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#2F3036",
  },
  activeCategoryButtonText: {
    color: "#E8E9F1",
  },
  flatListContainer: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  columnWrapper: {
    gap: 16,
    padding: 8,
  },
  itemContainer: {
    flex: 1,
  },
});
