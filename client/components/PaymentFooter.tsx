import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

interface PriceProps {
    price: string;
    currency: string;
}

interface PaymentFooterProps {
    price: PriceProps;
    buttonTitle: string;
    quantity: number;
    navigation: any;
}

const PaymentFooter: React.FC<PaymentFooterProps> = ({
    price,
    buttonTitle,
    quantity,
    navigation,
}) => {
    return (
        <TouchableOpacity
            style={styles.PriceFooter}
            onPress={() => {
                navigation.navigate('ShippingMethod');
            }}
        >
            <View style={styles.PriceContainer}>
                <Text style={styles.Quantity}>{quantity} items</Text>
                <Text style={styles.PriceText}>${price.price}</Text>
            </View>
            <Text style={styles.OrderNowTitle}>Order Now</Text>
        </TouchableOpacity>
    );
};
const primaryBrownHex = '#38220f';
const primaryWhiteHex = '#FFFFFF';

const styles = StyleSheet.create({
    PriceFooter: {
        fontFamily: 'Poppins-Regular',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: primaryBrownHex,
        height: 76,
        width: '90%', // make it full width
        position: 'absolute', // position it absolutely
        bottom: 50, // at the bottom
        alignSelf: 'center', // center it horizontally
        borderRadius: 20,
    },

    PriceContainer: {
        alignItems: 'flex-start',
        width: 100,
        paddingLeft: 20,
        justifyContent: 'center',
    },

    Quantity: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: primaryWhiteHex,
    },

    PriceText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        color: primaryWhiteHex,
        fontWeight: 'bold',
    },

    OrderNowTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        color: primaryWhiteHex,
        fontWeight: 'bold',
        paddingRight: 20,
    },
});

export default PaymentFooter;
