import { Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

interface OrderCardProps {
}

const OrderCard: React.FC<OrderCardProps> = ({
}) => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const deleteItem = () => {
        // Add your delete logic here
    };

    return (
        <View
            style={styles.container}
            className="flex-1 py-3 px-4 flex-row justify-between items-center bg-white rounded-2xl"
        >
            <Image
                src="https://www.starbucks.vn/media/iebnrg1m/hazelnut-macchiato_tcm89-24778_w1024_n.jpg"
                className="w-[76px] h-[76px] rounded-full mb-2"
            />
            <View className="min-h-[110px] flex-col justify-between">
                <Text className="text-[14px] font-bold text-[#38220F]">Vanilla Chai</Text>
                <View className="flex-col">
                    <Text className="text-[10px] text-[#38220F]">Medium Size</Text>
                    <Text className="text-[10px] text-[#38220F]">Medium Size</Text>
                    <Text className="text-[10px] text-[#38220F]">Medium Size</Text>
                </View>
                <Text className="text-[#967259] font-bold text-[16px]">$27.45</Text>
            </View>
            <View className="flex-row items-center">
                <TouchableOpacity
                    onPress={decreaseQuantity}
                    className="w-6 h-6 rounded-3xl bg-[#ECE0D1] justify-center items-center"
                >
                    <AntDesign name="minus" size={14} color="black" />
                </TouchableOpacity>
                <Text className="mx-1 text-[14px] text-[#1F2024]">{quantity}</Text>
                <TouchableOpacity
                    onPress={increaseQuantity}
                    className="w-6 h-6 rounded-3xl bg-[#ECE0D1] justify-center items-center"
                >
                    <AntDesign name="plus" size={14} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={deleteItem}
                    className="ml-3 w-6 h-6 rounded-3xl bg-[#ECE0D1] justify-center items-center"
                >
                    <AntDesign name="delete" size={14} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OrderCard;

const styles = StyleSheet.create({
    container: {
        shadowColor: '#A9A9A9',
        shadowOffset: { width: 0, height: 0 }, // Dịch chuyển
        shadowOpacity: 0.5, // Độ trong suốt
        shadowRadius: 2, // Bán kính blur
        elevation: 1, // For Android
    },
});
