import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from '@expo/vector-icons';
import { router } from 'expo-router';
import { ROUTES } from '@/constants/route';

const MainBottomTab = () => {
  return (
    <View className="relative bg-[#38220F] px-9 py-6 pb-10 flex-row justify-between items-center">
      <View className="flex-row">
        <TouchableOpacity>
          <Ionicons name="bag" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="ml-9"
          onPress={() => router.navigate(ROUTES.CATEGORIES)}
        >
          <FontAwesome5 name="book-open" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="w-[96px] h-[96px] rounded-full bg-[#967259] justify-center items-center absolute -top-10 left-1/2 transform -translate-x-1/2"
        onPress={() => router.navigate(ROUTES.HOME)}
      >
        <Entypo name="home" size={42} color="white" />
      </TouchableOpacity>
      <View className="flex-row">
        <TouchableOpacity>
          <AntDesign name="heart" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="ml-9">
          <FontAwesome name="user" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainBottomTab;

const styles = StyleSheet.create({});
