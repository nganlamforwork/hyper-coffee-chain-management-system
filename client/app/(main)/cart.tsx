import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Checkbox from 'expo-checkbox';
import OrderCard from '@/components/OrderCard';

const cart = () => {
  return (
    <>
      <View className="mb-7">
        <Text className="font-bold text-[24px] text-[#1F2024] text-center">
          Cart
        </Text>
      </View>
      <Text className="ml-6 mb-6 text-[14px]">
        You have <Text className="font-bold text-[#967259]">3 items</Text> in
        your cart
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} className="pt-1">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
          <View className="mb-4 flex-row mx-4 items-center">
            <Checkbox className="mr-4 w-4 h-4 border border-[#967259] rounded" />
            <OrderCard />
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default cart;

const styles = StyleSheet.create({});
