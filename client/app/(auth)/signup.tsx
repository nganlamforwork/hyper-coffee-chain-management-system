import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { ROUTES } from '@/constants/route';

const signup = () => {
  return (
    <View className="w-[80%] bg-white rounded-[36px] p-[36px] flex-col items-center">
      <View className="flex-row bg-[#ECE0D1] rounded-xl">
        <TouchableOpacity
          className="w-[110px] px-4 py-2"
          onPress={() => router.replace(ROUTES.LOGIN)}
        >
          <Text className="text-center text-[14px] text-[#71727A]">Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-[110px] bg-[#967259] px-4 py-2 rounded-xl">
          <Text className="text-center text-[14px] text-white">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default signup;
