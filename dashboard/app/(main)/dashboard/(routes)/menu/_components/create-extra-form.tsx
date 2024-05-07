"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader } from "@/components/global/loader";
import { Info, Plus, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useCreateExtraGroup,
  useUpdateExtraGroup,
} from "@/server/extra/mutations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProducts } from "@/server/product/queries";
import { Category, ExtraGroup, Product } from "@/types/product";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Extra Group Name must be at least 2 characters.",
  }),
  min: z.string().default("1"),
  max: z.string(),
  type: z.string().default("must"),
});

interface Extra {
  name: string;
  price: string;
  status: string;
}
interface CreateExtraGroupFormProps {
  update?: boolean;
  extraGroup?: ExtraGroup;
}

const CreateExtraForm = ({ update, extraGroup }: CreateExtraGroupFormProps) => {
  const { data: products } = useProducts();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: extraGroup?.name ?? "",
      min: extraGroup?.min?.toString() ?? "1",
      max: extraGroup?.max?.toString() ?? "10",
      type: extraGroup?.type ?? "must",
    },
  });
  const [extras, setExtras] = useState<Extra[]>([]);
  const [chosenProducts, setChosenProducts] = useState<Product[]>([]);
  const isLoading = form.formState.isLoading;
  const createExtraGroup = useCreateExtraGroup();
  const updateExtraGroup = useUpdateExtraGroup();
  useEffect(() => {
    if (update && extraGroup) {
      setChosenProducts(extraGroup.products || []);
      setExtras(extraGroup.extras);
    }
  }, [update, extraGroup]);
  function onSubmit(data: z.infer<typeof formSchema>) {
    if (update) {
      const updatedExtraData = {
        ...data,
        id: extraGroup?.id,
        extras,
        products: chosenProducts,
      };
      updateExtraGroup.mutate(updatedExtraData);
    } else {
      const createExtraData = {
        ...data,
        extras,
        products: chosenProducts,
      };
      createExtraGroup.mutate(createExtraData);
    }
  }

  const handleLinkProduct = (product: Product) => {
    // Check if the product already exists in chosenProducts array
    const isProductAlreadyAdded = chosenProducts.some(
      (p) => p.id === product.id
    );

    // If the product doesn't exist, add it
    if (!isProductAlreadyAdded) {
      setChosenProducts([...chosenProducts, product]);
    }
  };
  const handleRemoveLinkedProduct = (index: number) => {
    const updatedChosenProducts = [...chosenProducts];
    updatedChosenProducts.splice(index, 1);
    setChosenProducts(updatedChosenProducts);
  };

  const handleAddNewExtra = () => {
    setExtras([...extras, { name: "", price: "", status: "in-stock" }]);
  };

  const handleExtraNameChange = (index: number, value: string) => {
    const updatedExtras = [...extras];
    updatedExtras[index].name = value;
    setExtras(updatedExtras);
  };

  const handleExtraPriceChange = (index: number, value: string) => {
    const updatedExtras = [...extras];
    updatedExtras[index].price = value;
    setExtras(updatedExtras);
  };

  const handleRemoveExtra = (index: number) => {
    const updatedExtras = [...extras];
    updatedExtras.splice(index, 1);
    setExtras(updatedExtras);
  };

  return (
    <Dialog>
      <div className="py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>EXTRA GROUP NAME *</FormLabel>
                  <FormControl>
                    <Input placeholder="Extra group name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full h-14 bg-gray-200 flex items-center px-4 font-bold">
              EXTRAS
            </div>
            <div className="flex flex-col gap-4">
              {extras.length !== 0 ? (
                extras.map((extra, index) => (
                  <div
                    className="grid grid-cols-6 gap-4 items-center"
                    key={index}
                  >
                    <div className="col-span-3">
                      <Label>EXTRA NAME *</Label>
                      <Input
                        placeholder="Extra name"
                        value={extra.name}
                        onChange={(e) =>
                          handleExtraNameChange(index, e.target.value)
                        }
                        className="mt-2"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>ADDITIONAL PRICE *</Label>
                      <div className="relative flex items-center mt-2">
                        <Label className="absolute left-0 w-8 h-full bg-gray-300 rounded-bl-md rounded-tl-md flex items-center justify-center">
                          $
                        </Label>
                        <Input
                          placeholder="0.0"
                          value={extra.price}
                          type="text"
                          min={0}
                          className="pl-12"
                          onChange={(e) =>
                            handleExtraPriceChange(index, e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <XCircle
                        className="h-4 w-4 text-red-500 cursor-pointer mt-8"
                        onClick={() => handleRemoveExtra(index)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No extras available
                </p>
              )}
              <Button
                type="button"
                variant="link"
                onClick={handleAddNewExtra}
                className="justify-start p-0"
              >
                Add new extra
              </Button>
            </div>
            <div className="w-full h-14 bg-gray-200 flex items-center px-4 font-bold">
              SELECTION RULES
            </div>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="must" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Your customer must select
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="optional" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Optional for your customer to select
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2 ">
              <div>
                <FormField
                  control={form.control}
                  name="min"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          placeholder="Min value"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="max"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Max value"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Alert
              variant={
                form.watch("type") === "optional" ? "info" : "destructive"
              }
            >
              <Info className="h-4 w-4" />
              <AlertTitle>Attention</AlertTitle>
              <AlertDescription>
                {form.watch("type") === "optional"
                  ? `Your customer can select ${form.watch(
                      "min"
                    )} to ${form.watch("max")} option(s), or none at all.`
                  : `Your customer must select ${form.watch(
                      "min"
                    )} to ${form.watch(
                      "max"
                    )} option(s), none is not accepted.`}
              </AlertDescription>
            </Alert>

            <div className="flex flex-col gap-4">
              <div className="w-full h-14 bg-gray-200 flex items-center px-4 font-bold">
                LINK PRODUCTS
              </div>
              <div className="flex flex-col gap-4">
                {chosenProducts.length !== 0 ? (
                  chosenProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 border p-2 relative"
                    >
                      <div className="flex flex-col gap-1">
                        <p>{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${product.price}
                        </p>
                      </div>
                      <XCircle
                        className="h-4 w-4 text-red-500 cursor-pointer absolute -top-2 -right-2"
                        onClick={() => handleRemoveLinkedProduct(index)}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No products added
                  </p>
                )}
              </div>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="link"
                  className="justify-start p-0"
                >
                  Add product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl overflow-auto">
                <DialogHeader className="relative">All Products</DialogHeader>
                <div className="grid grid-cols-3 gap-4 mt-2 overflow-auto max-h-[200px]">
                  {products &&
                    products.map((product: Product) => (
                      <div
                        key={product.id}
                        className="p-4 border rounded-lg flex items-center justify-between relative"
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            alt="productImage"
                            src={product.imageUrl!}
                            height={60}
                            width={60}
                            objectFit="cover"
                            className="rounded-lg"
                          />
                          <div>
                            <p>{product.name}</p>
                            <p>$ {product.price}</p>
                          </div>
                        </div>
                        <div
                          className="absolute bottom-0 right-0 bg-yellow-900 p-2 rounded-br-md rounded-tl-md"
                          onClick={() => handleLinkProduct(product)}
                        >
                          <Plus className="h-4 w-4 cursor-pointer text-white opacity-100 hover:opacity-70 transition-opacity" />
                        </div>
                      </div>
                    ))}
                </div>
              </DialogContent>
            </div>
            {update ? (
              <Button
                type="submit"
                disabled={isLoading || updateExtraGroup.isPending}
              >
                {(isLoading || updateExtraGroup.isPending) && (
                  <Loader className="h-4 w-4 mr-2" />
                )}
                Update Extra Group
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading || createExtraGroup.isPending}
              >
                {(isLoading || createExtraGroup.isPending) && (
                  <Loader className="h-4 w-4 mr-2" />
                )}
                Create Extra Group
              </Button>
            )}
          </form>
        </Form>
      </div>
    </Dialog>
  );
};

export default CreateExtraForm;
