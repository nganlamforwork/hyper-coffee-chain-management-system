"use client";

import { ProductCard } from "../../dashboard/(routes)/orders/_components/product-card";
import { useProducts } from "@/server/product/queries";
import { OrderDetails, Product } from "@/types/product";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { CategoryList } from "./_components/category-list";
import { useEffect, useState } from "react";
import { Loader } from "@/components/global/loader";
import CreateOrderForm from "../../dashboard/(routes)/orders/_components/create-order-form";
import { Input } from "@/components/ui/input";

const NewOrderPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([]);
  const { data: products, refetch, isLoading } = useProducts(selectedCategory);

  useEffect(() => {
    refetch();
  }, [selectedCategory, refetch]);

  return (
    <div className="h-full flex flex-col">
      {/* Navbar */}
      <nav className="border-b flex items-center p-4">
        <Link href="/dashboard/orders" passHref>
          <X className="w-6 h-6 mr-2 cursor-pointer hover:opacity-75 opacity-100 transition-opacity" />
        </Link>
        <span className="text-lg font-bold">NEW ORDER</span>
      </nav>
      {/* Main Content */}
      <main className="flex-grow grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* Sidebar */}
        <div className="md:col-span-1 border-r p-4">
          <CategoryList setSelectedCategory={setSelectedCategory} />
        </div>
        {/* Product List */}
        <div className="md:col-span-3 p-4 border-r relative">
          <div className="relative mb-4 w-[50%] ml-auto">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? (
              <div className="absolute top-[50%] left-0 right-0">
                <Loader />
              </div>
            ) : products && products.length !== 0 ? (
              products?.map((product: Product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  setOrderDetails={setOrderDetails}
                  orderDetails={orderDetails}
                />
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
        </div>
        {/* Product Details */}
        <div className="md:col-span-2 p-4 hidden md:block">
          <CreateOrderForm
            orderDetails={orderDetails}
            setOrderDetails={setOrderDetails}
          />
        </div>
      </main>
    </div>
  );
};

export default NewOrderPage;
