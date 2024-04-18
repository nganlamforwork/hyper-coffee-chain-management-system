import { StatusBar } from 'react-native';
import React from 'react';
import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainBottomTab from '@/components/MainBottomTab';

const MainLayout = () => {
  return (
    <>
      <StatusBar translucent barStyle="dark-content" />

      <SafeAreaView edges={['top']} className="flex-1 bg-white">
        <Slot />
      </SafeAreaView>

      <MainBottomTab />
    </>
  );
};

export default MainLayout;
