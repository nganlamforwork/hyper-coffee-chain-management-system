import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { categoriesData } from '@/constants/home';
import ProductCard from '@/components/ProductCard';

const categories = () => {
  const [activeCategory, setActiveCategory] = useState(1);

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
      <ScrollView className="mx-10" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between flex-wrap">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <View className="mb-4">
              <ProductCard />
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default categories;

const styles = StyleSheet.create({});
