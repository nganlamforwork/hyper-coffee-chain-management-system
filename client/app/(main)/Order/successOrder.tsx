import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
interface SuccessOrderProps {
    navigation: any;
}

const SuccessOrder: React.FC<SuccessOrderProps> = ({navigation}) => {
    return (
        <View style={styles.contentContainer}>
            <Image source={require('../../../assets/images/success.png')} />
            <View>
                <Text
                    style={{
                        color: '#000',
                        fontSize: 24,
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}
                >
                    Order Success
                </Text>
                <Text
                    style={{
                        color: '#71727A',
                        fontSize: 16,
                        textAlign: 'center',
                        marginTop: 10,
                    }}
                >
                    Your order <Text style={{ color: '#000', fontWeight: '700' }}>#Order-ID</Text>{' '}
                    has been delivered to your location. Thanks for being our valid customer.
                </Text>
            </View>
            <TouchableOpacity style={styles.buttonBackToHome} onPress={()=>{navigation.navigate("Home")}}>
                <Text
                    style={{
                        color: '#967259',
                        textAlign: 'center',
                        fontWeight: '400',
                        fontSize: 16,
                    }}
                >
                    Back to Home
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonGiveFeedback} onPress={()=>{navigation.navigate("Feedback")}}>
                <Text
                    style={{
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: '400',
                        fontSize: 16,
                    }}
                >
                    Give Feedback
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default SuccessOrder;

const styles = StyleSheet.create({
    contentContainer: {
        padding: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    buttonBackToHome: {
        borderWidth: 1,
        borderColor: '#967259',
        borderRadius: 16,
        color: '#967259',
        justifyContent: 'center',
        paddingVertical: 16,
        width: '100%',
    },
    buttonGiveFeedback: {
        backgroundColor: '#967259',
        borderRadius: 16,
        justifyContent: 'center',
        paddingVertical: 16,
        width: '100%',
    },
});
