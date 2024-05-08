import PaymentHeader from '@/components/PaymentComponent/PaymentHeader';
import RadioPayment from '@/components/PaymentComponent/RadioPayment';
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

interface PaymentProps {
    navigation: any;
}

const options = [
    {
        label: 'VietQR',
        value: 'vietqr',
        image: require('../../../assets/images/vietqr.png'),
    },
    {
        label: 'ZaloPay',
        value: 'zalopay',
        image: require('../../../assets/images/zalo.png'),
    },
    {
        label: 'Momo',
        value: 'momo',
        image: require('../../../assets/images/momo.png'),
    },
    {
        label: 'COD',
        value: 'cod',
        image: null,
    },
];

const Payment: React.FC<PaymentProps> = ({navigation}) => {
    const [value, setValue] = useState<string | null>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [ship, setShip] = useState<string | null>(options[0].value);

    // const [currentPosition, setCurrentPosition] = useState(0);

    const renderLabel = () => {
        if (value || isFocus) {
            return <Text style={[isFocus && { color: 'blue' }]}>Dropdown label</Text>;
        }
        return null;
    };
    return (
        <ScrollView>
            <View style={styles.container}>
                <PaymentHeader state={1} />
            </View>

            <View style={styles.contentContainer}>
                {/* <View
                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                    <View style={{ width: 100, height: 1, backgroundColor: '#bdbdbd' }} />
                    <Text style={{ color: '#BDBDBD' }}> or </Text>
                    <View style={{ width: 100, height: 1, backgroundColor: '#bdbdbd' }} />
                </View> */}
                <View style={styles.contentComponent}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    ></View>
                    <View>
                        <RadioPayment
                            options={options}
                            checkedValue={ship || ''}
                            onChange={setShip}
                            style={{ backgroundColor: 'match-parent' }}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.buttonContinue} onPress={()=>{navigation.navigate("Review")}}>
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

export default Payment;

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
});
