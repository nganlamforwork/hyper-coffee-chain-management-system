import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Slot, Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from './cart';
import Categories from './categories';
import Favorites from './favorites';
import Home from './home';
import Me from './me';
import ShippingMethod from './Payment/shippingMethod';
import Payment from './Payment/payment';
import Review from './Payment/review';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

const CartStack = createStackNavigator();

const MainLayout = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <>
            <StatusBar translucent barStyle="dark-content" />

            <SafeAreaView edges={['top']} style={{ flex: 1, paddingTop: 0 }}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarStyle: styles.container,
                        tabBarActiveTintColor: 'white',
                        tabBarInactiveTintColor: 'gray',
                    }}
                >
                    <Tab.Screen
                        name="cart"
                        // component={MyCartStack}
                        options={{
                            title: 'Cart',
                            tabBarStyle: { display: isChecked ? 'none' : 'flex' },
                            headerShown: false,
                            tabBarIcon: ({ focused }) => (
                                <FontAwesome
                                    name="shopping-cart"
                                    size={20}
                                    color={focused ? 'white' : 'gray'}
                                />
                            ),
                        }}
                    >
                        {(props) => (
                            <CartStack.Navigator
                                screenOptions={{
                                    headerShown: false,
                                }}
                            >
                                <CartStack.Screen name="Cart" component={Cart} />
                                <CartStack.Screen
                                    name="ShippingMethod"
                                    component={ShippingMethod}
                                />
                                <CartStack.Screen name="Payment" component={Payment} />
                                <CartStack.Screen name="Review" component={Review} />
                            </CartStack.Navigator>
                        )}
                    </Tab.Screen>

                    <Tab.Screen
                        name="categories"
                        component={Categories}
                        options={{
                            title: 'Categories',
                            headerShown: false,
                            tabBarIcon: ({ focused }) => (
                                <FontAwesome
                                    name="list"
                                    size={20}
                                    color={focused ? 'white' : 'gray'}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="home"
                        component={Home}
                        options={{
                            title: '',
                            headerShown: false,
                            tabBarIcon: () => (
                                <View style={styles.home}>
                                    <FontAwesome name="home" size={36} color="white" />
                                </View>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="favorites"
                        component={Favorites}
                        options={{
                            title: 'Favorites',
                            headerShown: false,
                            tabBarIcon: ({ focused }) => (
                                <FontAwesome
                                    name="heart"
                                    size={20}
                                    color={focused ? 'white' : 'gray'}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="me"
                        component={Me}
                        options={{
                            title: 'Me',
                            headerShown: false,
                            tabBarIcon: ({ focused }) => (
                                <FontAwesome
                                    name="user"
                                    size={20}
                                    color={focused ? 'white' : 'gray'}
                                />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </SafeAreaView>
        </>
    );
};

export default MainLayout;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#38220F',
        paddingHorizontal: 8,
        paddingVertical: 6,
        paddingBottom: 24,
    },
    home: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#967259',
        width: Platform.OS == 'ios' ? 70 : 80,
        height: Platform.OS == 'ios' ? 70 : 80,
        top: -20,
        borderRadius: 999,
    },
});
