import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductSchema } from "@/constants/schema";
import { SummaryApi } from "@/constants/SummaryApi";
import { useToast } from "@/hooks/use-toast";
import Axios from "@/lib/Axios";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import DropzoneImageField from "./DropzoneImageField";
import { Card, CardContent } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import uploadImage from "@/lib/uploadImage";
import React from "react";

interface ProductProps {
  initialData?: {
    name: string;
    image: Array<any> | undefined;
    categoryId: string;
    sub_categoryId: string;
    unit: string;
    stock: number;
    status: boolean;
    price: number;
    salePrice: number;
    discount: number;
    description: string;
    role: "edit" | "add";
  };
  id?: string;
}

export default function ProductForm({ initialData, id }: ProductProps) {
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          image: initialData.image,
          unit: initialData.unit,
          description: initialData.description,
          status: initialData.status,
          categoryId: initialData.categoryId,
          sub_categoryId: initialData?.sub_categoryId,
          discount: initialData.discount,
          price: initialData.price,
          salePrice: initialData.salePrice,
          stock: initialData.stock,
          role: initialData.role,
        }
      : {
          name: "",
          image: [],
          unit: "",
          description: "",
          status: false,
          categoryId: "",
          sub_categoryId: "",
          discount: 0,
          price: 0,
          salePrice: 0,
          stock: 0,
          role: "add",
        },
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const categoryList = useSelector(
    (state: RootState) => state.product.categoryList,
  );
  const SubcategoryList = useSelector(
    (state: RootState) => state.product.subcategoryList,
  );

  const categoryTypes = Array.isArray(categoryList)
    ? categoryList.map((category: any) => ({
        value: category._id || "N/A",
        label: category.name || "N/A",
      }))
    : [];
  const subCategoryTypes = Array.isArray(SubcategoryList)
    ? SubcategoryList.map((subCategory: any) => ({
        value: subCategory._id || "N/A",
        label: subCategory.name || "N/A",
      }))
    : [];
  const [isImageLoading, setImageLoading] = React.useState<boolean>(false);

  const handleImageUpload = async (
    acceptedFiles: File[],
    onChange: (value: string | string[]) => void,
    value: string | string[],
  ) => {
    try {
      setImageLoading(true); // Show loading state while uploading images

      // Upload all the files
      const uploadedUrls = await Promise.all(
        acceptedFiles.map(async (file: File) => {
          const response = await uploadImage(file); // Assume uploadImage is an API call to upload the image
          return response.data.data.url; // Get URL of uploaded image
        }),
      );

      // Sync with the form state (pass the array of URLs to form)
      const currentImages = value || [];
      const updatedImages = [...currentImages, ...uploadedUrls];
      onChange(updatedImages);

      setImageLoading(false); // Hide loading after the images are uploaded
    } catch (error) {
      console.error("Image upload failed", error);
      setImageLoading(false); // Hide loading if there's an error
    }
  };

  async function onSubmit(data: z.infer<typeof ProductSchema>) {
    //handling add and  update
    try {
      let response;
      //handle update product
      if (initialData) {
        response = await Axios({
          ...SummaryApi.update_product, // update  product link
          data: {
            _id: id,
            ...data,
          },
        });
      } else {
        //handle app-product
        response = await Axios({
          ...SummaryApi.add_product, //add product link
          data: data,
        });
      }
      console.log("response data: ", response);
      form.reset();
      navigate("/dashboard-page/products");
      window.location.reload();
      toast({
        title:
          initialData?.role === "edit" ? "Category Update" : "Category Added",
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
    <Card className="mx-6 mb-10 p-6">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <h1 className="text-xl font-semibold text-secondary/70">
              Product Information
            </h1>
            <Card className="my-4 grid gap-4 border-none lg:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Product Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Product Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryTypes.map((item, _index) => (
                          <SelectItem key={_index} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="Product Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sub_categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Sub_Category</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Product sub-category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subCategoryTypes.map((item, _index) => (
                          <SelectItem key={_index} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>

            <h1 className="mb-4 text-xl font-semibold text-secondary/70">
              Product Image
            </h1>
            <DropzoneImageField
              loading={isImageLoading}
              name="image"
              form={form}
              handleImageUpload={handleImageUpload}
              multiple={true}
            />

            <h1 className="my-4 text-xl font-semibold text-secondary/70">
              Product Descriptions
            </h1>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Tell a little bit about your product"
                      className="h-32 resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* gird */}
            <Card className="mb-6 grid gap-10 border-none md:grid-cols-2">
              {/* product price card */}
              <Card className="my-4 p-2">
                <CardContent>
                  <h1 className="my-4 text-xl font-semibold text-secondary/70">
                    Product Price
                  </h1>
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="my-5">
                        <FormLabel>Regular Price</FormLabel>
                        <FormControl>
                          <Input
                            className="no-arrows"
                            type="number"
                            placeholder="$0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="salePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sales Price</FormLabel>
                        <FormControl>
                          <Input
                            className="no-arrows"
                            type="number"
                            placeholder="$0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              {/* Other details card */}
              <Card className="my-4 p-2">
                <CardContent>
                  <h1 className="my-4 text-xl font-semibold text-secondary/70">
                    Other Details
                  </h1>
                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem className="my-2">
                        <FormLabel>Discount</FormLabel>
                        <FormControl>
                          <Input
                            className="no-arrows"
                            type="number"
                            placeholder="$0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem className="my-2">
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input
                            className="no-arrows"
                            type="number"
                            placeholder="$0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="my-5">
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) =>
                              field.onChange(value === "true")
                            }
                            defaultValue={field.value ? "true" : "false"}
                            className="flex items-center space-x-2"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="true" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Active
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="false" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Disabled
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </Card>

            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="w-full tracking-wide"
            >
              {initialData?.role === "edit" ? "Update Product" : "Add Product"}
              {form.formState.isSubmitting && (
                <Loader className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
