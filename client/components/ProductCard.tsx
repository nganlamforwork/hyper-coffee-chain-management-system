import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import { FontAwesome6, Fontisto } from '@expo/vector-icons';
import { Product } from '@/type';
import { useRouter } from 'expo-router';
import { ROUTES } from '@/constants/route';

interface ProductCardProps {
  product?: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const handleRenderProductName = (name?: string) => {
    if (name) {
      return product?.name?.length > 18
        ? product?.name.substring(0, 16 - 3) + '...'
        : product?.name;
    } else return 'Double Espresso';
  };

  return (
    <TouchableOpacity
      style={styles.container}
      className={`relative min-w-[140px] rounded-3xl p-4 bg-white`}
      onPress={() => {
        product &&
          router.push({
            pathname: `${ROUTES.PRODUCT}/${product?.id}`,
            params: { productString: JSON.stringify(product) },
          });
      }}
    >
      <Image
        src={
          product?.imageUrl ||
          'https://res.cloudinary.com/dckbae28z/image/upload/v1714978999/products/lypx6b9pn7nxjnwihrs5.webp'
        }
        className="w-[62px] h-[62px] rounded-full mb-2"
      />
      <Text className="text-[16px] font-bold mb-2">
        {handleRenderProductName(product?.name)}
      </Text>
      <Text className="text-[14px] font-bold mb-2">
        ${product?.price || 2.53}
      </Text>
      <View className="flex-row items-center">
        <Fontisto name="star" size={16} color="#FFE147" />
        <Text className="text-[10px] ml-1">{4.5}</Text>
      </View>
      <TouchableOpacity className="absolute bg-[#967259] p-4 rounded-tl-3xl rounded-br-3xl bottom-0 right-0">
        <FontAwesome6 name="plus" size={12} color="#E8E9F1" />
      </TouchableOpacity>
    </TouchableOpacity>
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
