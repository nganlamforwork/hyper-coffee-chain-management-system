import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ImageBackground,
    ImageProps,
} from 'react-native';
import React from 'react';

import { FontAwesome6, Fontisto } from '@expo/vector-icons';

interface ProductCardProps {
    id: string;
    index: number;
    type: string;
    roasted: string;
    imagelink_square: ImageProps;
    name: string;
    special_ingredient: string;
    average_rating: number;
    price: any;
    buttonPressHandler: any;
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    index,
    type,
    roasted,
    imagelink_square,
    name,
    special_ingredient,
    average_rating,
    price,
    buttonPressHandler,
}) => {
    return (
        <View
            style={styles.container}
            className={`relative min-w-[140px] rounded-3xl p-4 bg-white`}
        >
            <Image
                src="https://www.starbucks.vn/media/iebnrg1m/hazelnut-macchiato_tcm89-24778_w1024_n.jpg"
                className="w-[62px] h-[62px] rounded-full mb-2"
            />
            {/* <Text className="text-[16px] font-bold mb-2">{name}</Text> */}
            <Text className="text-[16px] font-bold mb-2">Iced Coldbrew</Text>
            <Text className="text-[14px] font-bold mb-2">`${price}`</Text>
            <View className="flex-row items-center">
                <Fontisto name="star" size={16} color="#FFE147" />
                <Text className="text-[10px] ml-1">{average_rating}</Text>
            </View>
            <TouchableOpacity
                className="absolute bg-[#967259] p-4 rounded-tl-3xl rounded-br-3xl bottom-0 right-0"
                onPress={() => {
                    buttonPressHandler({
                        id,
                        index,
                        type,
                        roasted,
                        imagelink_square,
                        name,
                        special_ingredient,
                        prices: [{ ...price, quantity: 1 }],
                    });
                }}
            >
                <FontAwesome6 name="plus" size={12} color="#E8E9F1" />
            </TouchableOpacity>
        </View>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    container: {
        shadowColor: '#A9A9A9',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 1,
    },
});
