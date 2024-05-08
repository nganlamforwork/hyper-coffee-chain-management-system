import { Text, TouchableOpacity, StyleProp, ViewStyle, Image } from 'react-native'; // Add Image here
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { View } from '../Themed';

interface Option {
    value: string;
    label: string;
    image: any; // Define the type for image
}

interface RadioPaymentProps {
    options: Option[];
    checkedValue: string;
    onChange: (value: string) => void;
    style: StyleProp<ViewStyle>;
}

const RadioPayment = ({ options, checkedValue, onChange, style }: RadioPaymentProps) => {
    return (
        <View style={style}>
            {options.map((option: Option) => {
                let isActive = checkedValue === option.value;

                return (
                    <TouchableOpacity
                        style={isActive ? [styles.radio, styles.activeRadio] : styles.radio}
                        onPress={() => onChange(option.value)}
                        key={option.value}
                    >
                        <View style={styles.radioFirst}>
                            <MaterialIcons
                                name={isActive ? 'radio-button-checked' : 'radio-button-unchecked'}
                                size={24}
                                color={isActive ? '#967259' : '#C5C6CC'}
                            />
                            <View>
                                <Text style={styles.radioTitle}>{option.label}</Text>
                            </View>
                        </View>
                        <Image source={option.image} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default RadioPayment;

const styles = StyleSheet.create({
    radio: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        justifyContent: 'space-between',
        borderWidth: 1, // Add this line
        borderColor: '#C5C6CC', // Add this line
        backgroundColor: '#fff', // Add this line
    },
    radioFirst: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    radioTitle: {
        fontSize: 14,
        fontWeight: '400',
    },
    radioDescription: {
        fontSize: 10,
        fontWeight: '300',
    },
    radioPrice: {
        fontSize: 14,
    },
    activeRadio: {
        borderColor: '#967259',
    },
});
