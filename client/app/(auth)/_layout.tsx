import { Image, StatusBar, Text, View } from 'react-native';
import React from 'react';
import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const AuthLayout = () => {
  return (
    <>
      <StatusBar translucent barStyle="light-content" />

      <View className="relative h-screen bg-[#ECE0D1]">
        <Image
          source={require('@/assets/images/auth-thumbnail.png')}
          className="-translate-y-10 absolute"
        />
        <SafeAreaView className="items-center">
          <Text className="my-12 text-[36px] font-semibold text-center text-white">
            Hyper Coffee
          </Text>
          <Slot />
        </SafeAreaView>
      </View>
    </>
  );
};

export default AuthLayout;
