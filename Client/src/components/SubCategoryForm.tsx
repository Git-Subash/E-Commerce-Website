import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { subCategorySchema } from "@/constants/schema";
import Axios from "@/lib/Axios";
import { SummaryApi } from "@/constants/SummaryApi";

interface SubCategoryFormProps {
  id?: string;
  initialData?: {
    name: string;
    category: string;
    role: "edit" | "add";
  };
}
export default function SubCategoryForm({
  initialData,
  id,
}: SubCategoryFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof subCategorySchema>>({
    resolver: zodResolver(subCategorySchema),
    defaultValues: initialData
      ? {
          name: initialData?.name,
          category: initialData?.category,
          role: initialData.role,
        }
      : {
          name: "",
          category: "",
          role: "add",
        },
  });
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

  async function handleSubmit(data: z.infer<typeof subCategorySchema>) {
    try {
      let response;
      if (initialData) {
        response = await Axios({
          ...SummaryApi.update_SubCategory,
          data: {
            _id: id,
            categoryId: data.category,
            name: data.name,
          },
        });
      } else {
        response = await Axios({
          ...SummaryApi.add_SubCategory,
          data: {
            categoryId: data.category,
            name: data.name,
          },
        });
      }
      console.log(" Aub-category response Data", response);
      form.reset();
      navigate("/dashboard-page/sub-category");
      window.location.reload();
      toast({
        title:
          initialData?.role === "add"
            ? "Sub-Category Added"
            : "Sub-Category Updated",
        description: "The category has been successfully saved.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save the category. Please try again.",
      });
    }
  }
  return (
    <div className="mt-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
