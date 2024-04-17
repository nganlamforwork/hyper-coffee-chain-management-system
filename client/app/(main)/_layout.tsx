import { StatusBar, Text, View } from 'react-native';
import React from 'react';
import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainLayout = () => {
  return (
    <>
      <StatusBar translucent barStyle="dark-content" />

      <SafeAreaView edges={['top']} className="flex-1 bg-white">
        <Slot />
      </SafeAreaView>

      <View style={{ height: 50, backgroundColor: 'red' }}>
        <Text>Bottom View</Text>
      </View>
    </>
  );
};

export default MainLayout;
