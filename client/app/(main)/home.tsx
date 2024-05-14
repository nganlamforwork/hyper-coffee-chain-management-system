import { StyleSheet, ToastAndroid } from "react-native";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/config/axios";
import { useAuthStore } from "@/store/auth";
import { Category, Product } from "@/type";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const { user } = useAuthStore();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axiosInstance.get("/get-categories").then((res) => res.data.categories),
  });

  const { data: newArrivalsProducts } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axiosInstance
        .get("/get-products?limit=5")
        .then((res) => res.data.products),
  });

  const ProductCardAddToCart = ({}: any) => {
    ToastAndroid.showWithGravity(
      "Coffee is Added to Cart",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, {user?.name}!</Text>
        <Text style={styles.question}>What do you want today?</Text>
        <View style={styles.searchContainer}>
          <TouchableOpacity>
            <EvilIcons name="search" size={25} color="black" />
          </TouchableOpacity>
          <TextInput
            placeholder="Search for the drink item..."
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <TitleSection text="Categories" style={styles.titleSection} />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
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
                    styles.categoryText,
                    activeCategory === item.id && styles.activeCategoryText,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
        <TitleSection text="New Arrivals" style={styles.titleSection} />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {newArrivalsProducts &&
            newArrivalsProducts.map((item: Product) => (
              <View style={styles.productContainer} key={item.id}>
                <ProductCard product={item} />
              </View>
            ))}
        </ScrollView>
        <TitleSection text="Popular Picks" style={styles.titleSection} />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {newArrivalsProducts &&
            newArrivalsProducts.map((item: Product) => (
              <View style={styles.productContainer} key={item.id}>
                <ProductCard product={item} />
              </View>
            ))}
        </ScrollView>
        <TitleSection text="Hot Sales" style={styles.titleSection} />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {newArrivalsProducts &&
            newArrivalsProducts.map((item: Product) => (
              <View style={styles.productContainer} key={item.id}>
                <ProductCard product={item} />
              </View>
            ))}
        </ScrollView>
        <TitleSection text="News And Events" style={styles.titleSection} />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {[0, 1, 2, 3, 4].map((item) => (
            <TouchableOpacity style={styles.newsItem} key={item}>
              <View style={styles.newsImageContainer}>
                <Image
                  src="https://www.starbucks.vn/media/iebnrg1m/hazelnut-macchiato_tcm89-24778_w1024_n.jpg"
                  style={styles.newsImage}
                />
              </View>
              <Text style={styles.newsText}>
                Competition to Showcase Barista Talent
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </>
  );
};

function TitleSection({
  text,
  style,
  ...props
}: {
  text: string;
  style?: any;
}) {
  return (
    <View style={[styles.titleSectionContainer, style]} {...props}>
      <Text style={styles.titleSectionText}>{text}</Text>
      <TouchableOpacity style={styles.button}>
        <Entypo name="chevron-small-right" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  greeting: {
    fontSize: 14,
    marginBottom: 8,
  },
  question: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 16,
  },
  searchContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#ECE0D180",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    marginLeft: 16,
  },
  titleSection: {
    marginBottom: 16,
  },
  horizontalScroll: {
    marginLeft: 24,
    marginBottom: 16,
    paddingLeft: 4,
    paddingTop: 4,
    overflow: "visible",
  },
  categoryButton: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: "#ECE0D1",
  },
  activeCategoryButton: {
    backgroundColor: "#967259",
  },
  categoryText: {
    fontSize: 14,
    color: "#2F3036",
  },
  activeCategoryText: {
    color: "#E8E9F1",
  },
  productContainer: {
    marginRight: 16,
  },
  newsItem: {
    width: 160,
    marginRight: 16,
  },
  newsImageContainer: {
    width: "100%",
    height: 160,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 8,
  },
  newsImage: {
    width: "100%",
    height: "100%",
  },
  newsText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  titleSectionContainer: {
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleSectionText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "rgba(150, 114, 89, 0.2)",
    borderRadius: 999,
    padding: 2,
  },
});

export default Home;
