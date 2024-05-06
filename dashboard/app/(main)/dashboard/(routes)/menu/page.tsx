import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductLayout from "./layouts/product-layout";
import CategoryLayout from "./layouts/category-layout";
import ExtrasLayout from "./layouts/extras-layout";
import { Heading } from "@/components/global/heading";
import { Coffee } from "lucide-react";

const MenuPage = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Heading
        title={`Menu Overview`}
        description="Manage all categories, products and extra groups."
        icon={Coffee}
      />
      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList className="grid w-[400px] grid-cols-3 justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="categories"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            CATEGORIES
          </TabsTrigger>
          <TabsTrigger
            value="products"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            PRODUCTS
          </TabsTrigger>
          <TabsTrigger
            value="extraGroups"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            EXTRA GROUPS
          </TabsTrigger>
        </TabsList>
        <TabsContent value="categories">
          <CategoryLayout />
        </TabsContent>
        <TabsContent value="products">
          <ProductLayout />
        </TabsContent>
        <TabsContent value="extraGroups">
          <ExtrasLayout />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenuPage;
