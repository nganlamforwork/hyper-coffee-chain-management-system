import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Extra, ExtraGroups, Product } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/config/axios";
import { useCartStore } from "@/store/cart";

interface CartItem {
  product: Product;
  price: number;
  extras: Extra[];
  quantity: number;
  note?: string;
}

const ProductDetail = () => {
  const [note, setNote] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const router = useRouter();
  const params = useLocalSearchParams();

  const { data: product } = useQuery({
    queryKey: ["product"],
    queryFn: () =>
      axiosInstance
        .get(`/get-product/${params.id}`)
        .then((res) => res.data.product),
  });

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      console.log("No route to go back to");
    }
  };

  const handleHeartPress = () => {
    console.log("Heart button pressed");
  };

  const handleExtraSelection = (extraId: string) => {
    const isSelected = selectedExtras.includes(extraId);
    if (isSelected) {
      setSelectedExtras(selectedExtras.filter((id) => id !== extraId));
    } else {
      setSelectedExtras([...selectedExtras, extraId]);
    }
  };

  const addToCart = () => {
    let extrasTotalPrice = 0;
    selectedExtras.forEach((extraId) => {
      const extra = product?.extraGroups
        .flatMap((group: ExtraGroups) => group.extras)
        .find((extra: Extra) => extra.id === extraId);
      if (extra) {
        extrasTotalPrice += extra.price;
      }
    });

    const totalPrice = ((product?.price || 0) + extrasTotalPrice) * quantity;

    const cartItem: CartItem = {
      product: product,
      price: totalPrice,
      extras: selectedExtras.map((id) => {
        return product.extraGroups
          .flatMap((group: ExtraGroups) => group.extras)
          .find((extra: Extra) => extra.id === id) as Extra;
      }),
      quantity: quantity,
      note: note,
    };

    useCartStore.getState().addItem(cartItem);
  };

  useEffect(() => {
    let totalPrice = product?.price || 0;
    selectedExtras.forEach((extraId) => {
      const extra = product?.extraGroups
        .flatMap((group: ExtraGroups) => group.extras)
        .find((extra: Extra) => extra.id === extraId);
      if (extra) {
        totalPrice += extra.price;
      }
    });
    setPrice(totalPrice * quantity);
  }, [selectedExtras, product, quantity]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Stack Screen */}
      <Stack.Screen
        options={{
          title: product?.name,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTransparent: true,
          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={goBack}>
              <View style={styles.backButton}>
                <Feather name="chevron-left" size={24} color="white" />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleHeartPress}>
              <View style={styles.backButton}>
                <Feather name="heart" size={20} color="white" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.content}>
        {/* Image with Overlay */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: product?.imageUrl,
            }}
            style={styles.imageBackground}
            resizeMode="cover"
          />
          {/* Black Overlay */}
          <View style={styles.overlay} />
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.productPageTitle}>Description</Text>
            <Text style={styles.descriptionText}>{product?.description}</Text>
            <>
              {product?.extraGroups?.length &&
                product.extraGroups.map((item: ExtraGroups) => {
                  return (
                    <ExtraSection
                      key={item.id}
                      extraItem={item}
                      handleExtraSelection={handleExtraSelection}
                      selectedExtras={selectedExtras}
                    />
                  );
                })}
            </>
            <Text style={styles.productPageTitle}>Additional Notes</Text>
            <TextInput
              style={styles.input}
              multiline={true}
              numberOfLines={4}
              onChangeText={setNote}
              value={note}
              placeholder="Type your note here"
            />
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </View>
        </ScrollView>
        <AddToCartButton
          price={price}
          quantity={quantity}
          onPress={addToCart}
        />
      </View>
    </View>
  );
};

interface ExtraSectionProps {
  extraItem: ExtraGroups;
  handleExtraSelection: (extraId: string) => void;
  selectedExtras: string[];
}

const ExtraSection: React.FC<ExtraSectionProps> = ({
  extraItem,
  handleExtraSelection,
  selectedExtras,
}) => {
  const radio = extraItem.min == extraItem.max;
  return (
    <View>
      <View style={styles.extraTitleContainer}>
        <Text style={styles.productPageTitle}>{extraItem?.name}</Text>
        <Text style={styles.extraSubtitle}>
          {extraItem?.type == "optional" ? "Optional," : "Must,"}
          {radio
            ? ` max ${extraItem?.max}`
            : ` min ${extraItem?.min}, max ${extraItem?.max}`}
        </Text>
      </View>
      <View style={styles.extraListContainer}>
        {extraItem?.extras?.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.extraItem,
              {
                marginBottom: 4,
                opacity:
                  selectedExtras.length >= extraItem.max &&
                  !selectedExtras.includes(item.id)
                    ? 0.5
                    : 1,
              },
            ]}
            onPress={() => handleExtraSelection(item.id)}
            disabled={
              selectedExtras.length >= extraItem.max &&
              !selectedExtras.includes(item.id)
            }
          >
            <Checkbox
              value={selectedExtras.includes(item.id)}
              onValueChange={() => handleExtraSelection(item.id)}
              style={{ marginRight: 8 }}
              color="#967259"
            />
            <Text>{item.name}</Text>
            <Text style={styles.extraPrice}>${item.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  setQuantity,
}) => {
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <View style={styles.quantitySelectorContainer}>
      <TouchableOpacity
        style={{ backgroundColor: "#ECE0D1", padding: 4, borderRadius: 999 }}
        onPress={decreaseQuantity}
      >
        <Feather name="minus" size={20} color="black" />
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity
        onPress={increaseQuantity}
        style={{ backgroundColor: "#ECE0D1", padding: 4, borderRadius: 999 }}
      >
        <Feather name="plus" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const AddToCartButton = ({
  price,
  quantity,
  onPress,
}: {
  price: number;
  quantity: number;
  onPress: () => void;
}) => {
  return (
    <View style={styles.addToCartContainer}>
      <TouchableOpacity style={styles.addToCartButton} onPress={onPress}>
        <View>
          <Text style={styles.addToCartQuantity}>{quantity} item(s)</Text>
          <Text style={styles.addToCartPrice}>${price.toFixed(2)}</Text>
        </View>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backButton: {
    backgroundColor: "rgba(236, 224, 209, 0.3)",
    borderRadius: 999,
    padding: 4,
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    height: 36,
  },
  imageContainer: {
    width: "100%",
    height: 300,
    position: "relative",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  productPageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#38220F",
  },
  descriptionContainer: {
    padding: 24,
    gap: 24,
    paddingBottom: 160,
  },
  descriptionText: {
    fontSize: 14,
  },
  extraTitleContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  extraSubtitle: {
    fontSize: 12,
    color: "#38220F",
  },
  extraListContainer: {
    display: "flex",
    gap: 8,
  },
  extraItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  extraPrice: {
    marginLeft: "auto",
    fontSize: 12,
    color: "#71727A",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 16,
    minHeight: 100,
  },
  quantitySelectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  quantityText: {
    fontSize: 20,
    color: "#1F2024",
  },
  addToCartContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: "white",
    shadowColor: "#A9A9A9",
    shadowOffset: { width: 0, height: 0 }, // Dịch chuyển
    shadowOpacity: 0.5, // Độ trong suốt
    shadowRadius: 2, // Bán kính blur
    elevation: 1, // For Android
  },
  addToCartButton: {
    backgroundColor: "#38220F",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addToCartQuantity: {
    color: "#D4D6DD",
    marginBottom: 2,
  },
  addToCartPrice: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  addToCartText: {
    color: "white",
    fontSize: 14,
  },
});

export default ProductDetail;
