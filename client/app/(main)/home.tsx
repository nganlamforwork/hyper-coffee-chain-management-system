import { StyleSheet, ToastAndroid } from 'react-native';
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
import { categoriesData } from "@/constants/home";
import ProductCard from "@/components/ProductCard";
import { Link } from "expo-router";
import { useAuthStore } from "@/store/auth";

const home = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  const { user } = useAuthStore();

  const ProductCardAddToCart = ({}: any) => {
        ToastAndroid.showWithGravity(
            'Coffee is Added to Cart',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    };
    
    return (
        <>
            <View className="mx-6 mb-4">
                <Text className="text-[14px] mb-2">Hi, {user?.name}!</Text>
                <Text className="font-bold text-[16px] mb-4">What do you want today?</Text>
                <View className="py-3 px-4 bg-[#ECE0D180] rounded-3xl flex-row">
                    <TouchableOpacity>
                        <EvilIcons name="search" size={25} color="black" />
                    </TouchableOpacity>
                    <TextInput placeholder="Search for the drink item..." className="flex-1 ml-4" />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <TitleSection text="Categories" className="mb-4" />
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    className="ml-6 mb-4 min-h-[36px]"
                >
                    {categoriesData.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            className={`justify-center items-center mr-2 px-4 py-2 rounded-full bg-[#ECE0D1] ${
                                activeCategory === item.id ? 'bg-[#967259]' : ''
                            }`}
                            onPress={() => setActiveCategory(item.id)}
                        >
                            <Text
                                className={`text-[14px] text-[#2F3036] ${
                                    activeCategory === item.id ? 'text-[#E8E9F1]' : ''
                                }`}
                            >
                                {item.content}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <TitleSection text="New Arrivals" className="mb-4" />
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    className="ml-6 mb-4 pl-1 py-1 overflow-visible"
                >
                    {[0, 1, 2, 3, 4].map((item) => (
                        <View className="mr-4" key={item}>
                            <Link href={`/product/${item}/`}>
                                <ProductCard buttonPressHandler={ProductCardAddToCart} />
                            </Link>
                        </View>
                    ))}
                </ScrollView>
                <TitleSection text="Popular Picks" className="mb-4" />
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    className="ml-6 mb-4 pl-1 py-1 overflow-visible"
                >
                    {[0, 1, 2, 3, 4].map((item) => (
                        <View className="mr-4">
                            <Link href={`/product/${item}/`}>
                                <ProductCard buttonPressHandler={ProductCardAddToCart} />
                            </Link>
                        </View>
                    ))}
                </ScrollView>
                <TitleSection text="Hot Sales" className="mb-4" />
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    className="ml-6 mb-4 pl-1 py-1 overflow-visible"
                >
                    {[0, 1, 2, 3, 4].map((item) => (
                        <View className="mr-4">
                            <Link href={`/product/${item}/`}>
                                <ProductCard buttonPressHandler={ProductCardAddToCart} />
                            </Link>
                        </View>
                    ))}
                </ScrollView>
                <TitleSection text="News And Events" className="mb-4" />
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    className="ml-6 mb-4 pl-1 py-1 overflow-visible"
                >
                    {[0, 1, 2, 3, 4].map((item) => (
                        <TouchableOpacity className="w-[160px] mr-4">
                            <View className="w-full h-[160px] rounded-2xl overflow-hidden mb-2">
                                <Image
                                    src="https://www.starbucks.vn/media/iebnrg1m/hazelnut-macchiato_tcm89-24778_w1024_n.jpg"
                                    className="w-full h-full"
                                />
                            </View>
                            <Text className="text-[14px] font-bold">
                                Competition to Showcase Barista Talent
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </ScrollView>
        </>
    );
};

function TitleSection({ text, className, ...props }: { text: string; className?: string }) {
    return (
        <View className={`mx-6 flex-row justify-between items-center ${className}`} {...props}>
            <Text className="text-[18px] font-bold">{text}</Text>
            <TouchableOpacity style={styles.button}>
                <Entypo name="chevron-small-right" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgba(150, 114, 89, 0.2)',
        borderRadius: 999,
        padding: 2,
    },
});

export default home;
