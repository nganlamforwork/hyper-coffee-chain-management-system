"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { OrderDetails, Product } from "@/types/product";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import OrderDetailsForm from "./order-details-form";

interface ProductCardProps {
  product: Product;
  setOrderDetails: Dispatch<SetStateAction<OrderDetails[]>>;
  orderDetails: OrderDetails[];
}
export const ProductCard = ({
  product,
  orderDetails,
  setOrderDetails,
}: ProductCardProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined,
  );
  const handleDialogOpen = (product: Product) => {
    setSelectedProduct(product);
  };
  return (
    <Dialog>
      <div
        key={product.id}
        className="p-4 border rounded-lg flex items-center justify-between relative shadow-md"
      >
        <div className="flex flex-col gap-2">
          <Image
            alt="productImage"
            src={product.imageUrl!}
            height={60}
            width={60}
            objectFit="cover"
            className="rounded-full"
          />
          <div>
            <p className="text-md font-bold truncate line-clamp-2">
              {product.name}
            </p>
            <p className="text-sm text-yellow-900 font-bold">
              $ {product.price}
            </p>
          </div>
        </div>
        <DialogTrigger asChild>
          <div
            className="absolute bottom-0 right-0 bg-yellow-900 p-2 rounded-br-md rounded-tl-md"
            onClick={() => handleDialogOpen(product)}
          >
            <Plus className="h-4 w-4 cursor-pointer text-white opacity-100 hover:opacity-70 transition-opacity" />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl overflow-auto h-[800px]">
          <DialogHeader className="relative">
            <Image
              alt="Product Image"
              src={selectedProduct?.imageUrl!}
              height={1024}
              width={1024}
              objectFit="contain"
              className="absolute top-0 left-0 w-full h-40 bg-cover bg-center rounded-t-lg object-cover mt-4"
            />
          </DialogHeader>
          <OrderDetailsForm
            product={selectedProduct!}
            orderDetails={orderDetails}
            setOrderDetails={setOrderDetails}
          />
        </DialogContent>
      </div>
    </Dialog>
  );
};
