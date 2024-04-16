import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { ROUTES } from '@/constants/route';
import Checkbox from 'expo-checkbox';

const signup = () => {
  return (
    <View className="w-[80%] bg-white rounded-[36px] p-[36px] flex-col items-center">
      <View className="flex-row bg-[#ECE0D1] rounded-xl mb-[36px]">
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

      <View className="w-full mb-[36px]">
        <TextInput
          className="mb-4 px-3 py-4 rounded-xl border border-[#C5C6CC]"
          placeholder="Full name *"
        />
        <TextInput
          className="mb-4 px-3 py-4 rounded-xl border border-[#C5C6CC]"
          placeholder="Email/Phone number *"
        />
        <TextInput
          className="mb-4 px-3 py-4 rounded-xl border border-[#C5C6CC]"
          placeholder="Password *"
          secureTextEntry
        />
        <TextInput
          className="mb-4 px-3 py-4 rounded-xl border border-[#C5C6CC]"
          placeholder="Confirm Password *"
          secureTextEntry
        />
      </View>

      <View className="w-full">
        <TouchableOpacity className="w-full bg-[#967259] py-3 rounded-2xl mb-4">
          <Text className="text-[14px] text-white text-center">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default signup;
