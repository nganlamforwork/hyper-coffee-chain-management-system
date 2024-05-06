import { Dimensions, StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import StepIndicator from 'react-native-step-indicator';
import { MaterialIcons } from '@expo/vector-icons';

const customStyles = {
    stepIndicatorSize: 20,
    currentStepIndicatorSize: 60,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 1,
    stepStrokeCurrentColor: '#b0a297',
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: '#b0a297',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#b0a297',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#b0a297',
    stepIndicatorUnFinishedColor: '#694c35',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: 'transparent',
    stepIndicatorLabelFinishedColor: 'transparent',
    stepIndicatorLabelUnFinishedColor: 'transparent',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#b0a297',
};
const labels = ['Shipping', 'Payment', 'Review'];

const getStepIndicatorIconConfig = ({ position, stepStatus }: any) => {
    const iconConfig: {
        name: 'home' | 'local-shipping' | 'payment' | 'done-all';
        color: string;
        size: number;
    } = {
        name: 'home',
        color: stepStatus === 'finished' ? '#b0a297' : '#694c35',
        size: 30,
    };

    switch (position) {
        case 0: {
            iconConfig.name = 'local-shipping';
            break;
        }
        case 1: {
            iconConfig.name = 'payment';
            break;
        }
        case 2: {
            iconConfig.name = 'done-all';
            break;
        }
        default: {
            break;
        }
    }

    return iconConfig;
};

interface PaymentHeaderProps {
    state: number;
}
const PaymentHeader: React.FC<PaymentHeaderProps> = ({ state }) => {
    const [currentPosition, setCurrentPosition] = useState(state);
    const renderStepIndicator = (params: any) => (
        <MaterialIcons {...getStepIndicatorIconConfig(params)} />
    );
    return (
        <LinearGradient
            colors={['#967259', '#38220F']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
        >
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: 'white', fontWeight: '700' }}>
                    Shipping Method
                </Text>
            </View>
            <StepIndicator
                customStyles={customStyles}
                currentPosition={currentPosition}
                labels={labels}
                stepCount={3}
                renderStepIndicator={renderStepIndicator}
            />
        </LinearGradient>
    );
};

const primaryBrownHex = '#38220f';
const primaryWhiteHex = '#FFFFFF';

const styles = StyleSheet.create({
    gradient: {
        width: Dimensions.get('window').width,
        height: 225,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        justifyContent: 'center',
        gap: 15,
    },
});

export default PaymentHeader;
