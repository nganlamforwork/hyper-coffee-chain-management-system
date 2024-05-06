"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { CategoryTable } from "@/components/tables/category-tables/category-table";
import { columns } from "@/components/tables/category-tables/column";
import CreateCategoryForm from "../_components/create-category-form";
import { useCategories } from "@/server/category/queries";

const CategoryLayout = () => {
  const { data: categories } = useCategories();
  const totalCategories = categories ? categories.length : 0;
  return (
    <div>
      <Sheet>
        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between">
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Category
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-2xl">
              <SheetHeader>
                <SheetTitle>CREATE NEW CATEGORY</SheetTitle>
                <SheetDescription>
                  Fill in all the information fields below.
                </SheetDescription>
              </SheetHeader>
              <CreateCategoryForm />
            </SheetContent>
          </div>

          <CategoryTable columns={columns} data={categories || []} />
        </div>
      </Sheet>
    </div>
  );
};

export default CategoryLayout;
