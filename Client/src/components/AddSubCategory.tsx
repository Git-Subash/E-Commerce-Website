import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { SummaryApi } from "@/constants/SummaryApi";
import Axios from "@/lib/Axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSubCtegory } from "@/store/ProductSlice";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { RootState } from "@/store/store";

const Schema = z.object({
  name: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

export default function AddSubCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const categoryList = useSelector(
    (state: RootState) => state.product.categoryList,
  );

  // Use categoryList directly for productsData mapping
  const categoryTypes = Array.isArray(categoryList)
    ? categoryList.map((category: any) => ({
        value: category._id || "N/A",
        label: category.name || "N/A",
      }))
    : [];

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: "",
      category: "",
    },
  });
  async function onSubmit(data: z.infer<typeof Schema>) {
    try {
      const response = await Axios({
        ...SummaryApi.add_SubCategory,
        data: {
          categoryId: data.category,
          name: data.name,
        },
      });

      const { data: responseData } = response;

      if (responseData.data) {
        form.reset();
        navigate("/dashboard-page/sub-category");
        window.location.reload();
        toast({
          title: "Category Uploaded",
          description: "Your Profile has been created successfully.",
        });
      }
    } catch (error) {}
  }
  return (
    <div className="mt-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Category */}
          <Card>
            <CardContent className="h-ful4 mt-2 w-full p-6">
              <h1 className="mb-6 text-xl font-semibold text-secondary/70">
                Sub_Category Information
              </h1>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Sub_Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Sub_Category Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Product Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryTypes.map((item) => (
                          <SelectItem value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="w-full tracking-wide"
          >
            Add Category
            {form.formState.isSubmitting && (
              <Loader className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
