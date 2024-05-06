import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Checkbox from 'expo-checkbox';
import OrderCard from '@/components/OrderCard';
import PaymentFooter from '@/components/PaymentFooter';
import { Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

interface CartProps{
    onCheckboxClick: (value: boolean) => void;
}

const Cart: React.FC<CartProps> = ({ onCheckboxClick, navigation, route }: any) => {
    const [coffeeData, setCoffeeData] = useState([
        { id: 1, isChecked: false },
        { id: 2, isChecked: false },
        { id: 3, isChecked: false },
        { id: 4, isChecked: false },
        { id: 5, isChecked: false },
    ]);

    const [selectAll, setSelectAll] = useState(false);

    const [footerAnim] = useState(new Animated.Value(0));

    const [prevCheckedCount, setPrevCheckedCount] = useState(0);

    const paymentButtonPressHandler = () => {
        navigation.navigate('Payment');
    }

    const handleCheckboxClick = (value: boolean) => {
        onCheckboxClick(value);
    };

    const handleChange = (id: number, checked: boolean) => {
        setCoffeeData((prevState) =>
            prevState.map((coffee) =>
                coffee.id === id ? { ...coffee, isChecked: checked } : coffee
            )
        );
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        setCoffeeData((prevState) =>
            prevState.map((coffee) => ({ ...coffee, isChecked: !selectAll }))
        );
    };

    const handleReset = () => {
        setSelectAll(false);
        setCoffeeData((prevState) => prevState.map((coffee) => ({ ...coffee, isChecked: false })));
    };

    const checkedCount = coffeeData.filter((coffee) => coffee.isChecked).length;

    const startAnimation = () => {
        Animated.timing(footerAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        if (checkedCount >= 1) {
            footerAnim.setValue(0); // reset position
            startAnimation();
            handleCheckboxClick(true);
        } else {
            handleCheckboxClick(false);
        }
        setPrevCheckedCount(checkedCount);
    }, [checkedCount]);

    return (
        <>
            <View style={styles.ContentContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                        style={{ width: 0, flexGrow: 1, textAlign: 'center' }}
                        className="font-bold text-[24px] text-[#1F2024]"
                    >
                        Cart
                    </Text>
                    {coffeeData.length > 0 && checkedCount > 0 && (
                        <TouchableOpacity onPress={handleReset}>
                            <Text className="font-bold text-[12px] text-[#967259]">Cancel</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <Text className="mb-2 text-[14px]">
                    You have{' '}
                    <Text className="font-bold text-[#967259]">{coffeeData.length} item</Text> in
                    your cart
                </Text>
                {coffeeData.length > 0 && checkedCount > 0 && (
                    <Animated.View
                        style={{
                            opacity: footerAnim, // Apply the opacity animation
                        }}
                    >
                        <View style={styles.line} />
                        <View style={{ flexDirection: 'row' }} className="mt-4">
                            <Checkbox
                                className="mr-4 w-4 h-4 border border-[#967259] rounded"
                                value={selectAll}
                                onValueChange={handleSelectAll}
                                color={selectAll ? '#967259' : '#967259'}
                            />
                            <Text className="text-[14px] text-[#38220F]">Choose All</Text>
                        </View>
                    </Animated.View>
                )}

                <ScrollView showsVerticalScrollIndicator={false} className="pt-1">
                    {coffeeData.map((item) => (
                        <View className="flex-row items-center">
                            <Checkbox
                                className="mr-4 w-4 h-4 border border-[#967259] rounded"
                                value={item.isChecked}
                                onValueChange={(newValue) => handleChange(item.id, newValue)}
                                color={item.isChecked ? '#967259' : '#967259'}
                            />
                            <OrderCard />
                        </View>
                    ))}
                </ScrollView>
            </View>

            {coffeeData.length > 0 && checkedCount > 0 && (
                <Animated.View
                    style={{
                        opacity: footerAnim, // Apply the opacity animation
                    }}
                >
                    <PaymentFooter
                        buttonPressHandler={paymentButtonPressHandler}
                        buttonTitle="Pay"
                        price={{ price: '0', currency: '$' }}
                        quantity={4}
                    />
                </Animated.View>
            )}
        </>
    );
};

export default Cart;

const styles = StyleSheet.create({
    ContentContainer: {
        flex: 1,
        backgroundColor: '#f8f9fe',
        padding: 27,
    },
    line: {
        borderBottomColor: '#967259',
        borderBottomWidth: 1,
    },
});
