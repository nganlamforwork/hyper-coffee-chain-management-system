import OrderCard from '@/components/OrderCard';
import PaymentHeader from '@/components/PaymentComponent/PaymentHeader';
import Radio from '@/components/PaymentComponent/Radio';
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    ScrollView,
    TextInput,
} from 'react-native';
import { Image } from 'react-native';

interface ReviewProps {
    navigation: any; // replace 'any' with your navigation prop type
}

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];
const options = [
    {
        label: 'Standard Shipping',
        value: 'standard',
        description: 'Delivery in 5-7 business days',
        price: 0.5,
    },
    {
        label: 'Express Shipping',
        value: 'express',
        description: 'Delivery in 2-3 business days',
        price: 1,
    },
    {
        label: 'Next Day Shipping',
        value: 'next_day',
        description: 'Delivery by tomorrow',
        price: 0,
    },
];

const Review: React.FC<ReviewProps> = ({}) => {
    const [value, setValue] = useState<string | null>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [ship, setShip] = useState<string | null>(options[0].value);

    const [currentPosition, setCurrentPosition] = useState(0);
    const [coffeeData, setCoffeeData] = useState([
        { id: 1, isChecked: false },
        { id: 2, isChecked: false },
        { id: 3, isChecked: false },
        { id: 4, isChecked: false },
        { id: 5, isChecked: false },
    ]);
    const renderLabel = () => {
        if (value || isFocus) {
            return <Text style={[isFocus && { color: 'blue' }]}>Dropdown label</Text>;
        }
        return null;
    };
    return (
        <ScrollView>
            <View style={styles.container}>
                <PaymentHeader state={2} />
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.contentComponent}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={styles.title}>Address</Text>
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={{ fontSize: 14, fontWeight: '700', color: '#967259' }}>
                                Change
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardStyle}>
                        <View style={{ borderRadius: 12, flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Text
                                style={{
                                    color: '#967259',
                                    fontSize: 10,
                                    backgroundColor: '#ECE0D1',
                                    paddingHorizontal: 6,
                                    paddingVertical: 8,
                                    borderRadius: 12,
                                }}
                            >
                                Default
                            </Text>
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 12 }}>
                            John Doe
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: 4 }}>+1 123 456 7890</Text>
                        <Text style={{ fontSize: 14, marginTop: 4 }}>1234 Main Street</Text>
                    </View>
                </View>
                <View style={styles.contentComponent}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={styles.title}>Branch</Text>
                    </View>
                    <View style={styles.cardStyle}>
                        <Text>Branch 1</Text>
                    </View>
                </View>
                <View style={styles.contentComponent}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={styles.title}>Your Order</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} className="pt-1">
                        {coffeeData.map((item) => (
                            <View className="flex-row items-center" style={{ marginBottom: 15 }}>
                                <OrderCard />
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.contentComponent}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={styles.title}>Payment</Text>
                    </View>
                    <View
                        style={[
                            styles.cardStyle,
                            { flexDirection: 'row', justifyContent: 'space-between' },
                        ]}
                    >
                        <Text>VietQR</Text>
                        <Image source={require('../../../assets/images/vietqr.png')} />
                    </View>
                </View>
                <View style={styles.contentComponent}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={styles.title}>Summary</Text>
                    </View>
                    <View style={[styles.cardStyle, { gap: 10 }]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Subtotal</Text>
                            <Text style={styles.price}>$100.00</Text>
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#C5C6CC' }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text>Shipping</Text>
                                <Text style={{ fontSize: 10, color: '#666666' }}>
                                    Economy Shipping
                                </Text>
                            </View>
                            <Text style={styles.price}>$100.00</Text>
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#C5C6CC' }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#1F2024', fontWeight: '700', fontSize: 16 }}>
                                Total
                            </Text>
                            <Text style={styles.price}>$100.00</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonContinue}>
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: '400',
                            fontSize: 14,
                        }}
                    >
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Review;

const styles = StyleSheet.create({
    container: {},
    gradient: {
        width: Dimensions.get('window').width,
        height: 225,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        justifyContent: 'center',
        gap: 15,
    },
    contentComponent: {
        gap: 16,
    },
    cardStyle: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
    },
    contentContainer: {
        padding: 25,
        gap: 16,
    },
    buttonContinue: {
        backgroundColor: '#967259',
        borderRadius: 16,
        justifyContent: 'center',
        marginBottom: 20,
        paddingVertical: 16,
    },
    price: {
        color: '#967259',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
