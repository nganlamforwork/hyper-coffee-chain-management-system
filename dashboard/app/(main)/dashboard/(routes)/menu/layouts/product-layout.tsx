"use client";

import { Button } from "@/components/ui/button";
import { Coffee, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { ProductTable } from "@/components/tables/product-tables/product-table";
import { columns } from "@/components/tables/product-tables/column";
import { useProducts } from "@/server/product/queries";
import CreateProductForm from "../_components/create-product-form";

const ProductLayout = () => {
  const { data: products } = useProducts();
  const totalProducts = products ? products.length : 0;

  return (
    <Sheet>
      <div className="flex-1 space-y-4">
        <div className="flex items-start justify-between">
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-2xl overflow-auto">
            <SheetHeader>
              <SheetTitle>CREATE NEW PRODUCT</SheetTitle>

              <SheetDescription>
                Fill in all the information fields below.
              </SheetDescription>
            </SheetHeader>
            <CreateProductForm />
          </SheetContent>
        </div>

        <ProductTable columns={columns} data={products || []} />
      </div>
    </Sheet>
  );
};

export default ProductLayout;
