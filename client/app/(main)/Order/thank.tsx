import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
interface ThankProps {
    navigation: any;
}

const Thank: React.FC<ThankProps> = ({ navigation }) => {
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
                    Thanks for giving us your feedback!
                </Text>
            </View>
            <TouchableOpacity
                style={styles.buttonBackToHome}
                onPress={() => {
                    navigation.navigate('Home');
                }}
            >
                <Text
                    style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: '400',
                        fontSize: 16,
                    }}
                >
                    Back to Home
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Thank;

const styles = StyleSheet.create({
    contentContainer: {
        padding: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    buttonBackToHome: {
        backgroundColor: '#967259',
        borderRadius: 16,
        justifyContent: 'center',
        paddingVertical: 16,
        width: '100%',
    },
});
