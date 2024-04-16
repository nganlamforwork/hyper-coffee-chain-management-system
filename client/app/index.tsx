import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const OnboardingScreen = () => {
  return (
    <>
      <StatusBar translucent barStyle="light-content" />
      
      <View className="flex-1 flex-col bg-red-500">
        <View className="h-3/5 bg-black">
          <Image
            source={require('../assets/images/onboard.png')}
            alt="Onboard"
          />
        </View>

        <LinearGradient
          className="flex-1"
          colors={['#967259', '#38220F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <View className="flex-1 flex-col items-center gap-[50px] py-6">
            <View className="w-full max-w-[60%] flex-col items-center justify-center space-y-4">
              <Text className="font-semibold text-[34px] text-white text-center">
                Coffee so good, your taste buds will love it.
              </Text>
              <Text className="text-[14px] text-[#A9A9A9] text-center">
                The best grain, the finest roast, the powerful flavor.
              </Text>
            </View>

            <TouchableOpacity className="w-full max-w-[65%] bg-[#967259] py-4 rounded-2xl">
              <Text className="text-[16px] text-white text-center">
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </>
  );
};

export default OnboardingScreen;
