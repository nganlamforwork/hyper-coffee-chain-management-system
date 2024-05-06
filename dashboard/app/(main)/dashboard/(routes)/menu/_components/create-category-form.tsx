"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  useCreateCategory,
  useUpdateCategory,
} from "@/server/category/mutations";
import { Loader } from "@/components/global/loader";
import { Category } from "@/types/product";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
});

interface CreateCategoryFormProps {
  update?: boolean;
  category?: Category;
}

const CreateCategoryForm = ({ update, category }: CreateCategoryFormProps) => {
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: update && category ? category.name : "",
    },
  });
  const isLoading = form.formState.isLoading;
  function onSubmit(data: z.infer<typeof formSchema>) {
    if (update) {
      const updatedData = { ...category, ...data };
      updateCategory.mutate(updatedData);
      form.setValue("name", "");
    } else {
      createCategory.mutate(data);
      form.reset();
    }
  }
  return (
    <div className="py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your category name, e.g. Expresso, Chocolate,..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={createCategory.isPending}>
            {(isLoading || createCategory.isPending) && (
              <Loader className="h-4 w-4 mr-2" />
            )}
            {update ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCategoryForm;
