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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Dropzone, { DropzoneState } from "shadcn-dropzone";
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
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ACCEPTED_IMAGE_TYPES = {
  "image/jpeg": [],
  "image/jpg": [],
  "image/png": [],
  "image/webp": [],
};

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  unit: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a type of Product.",
  }),
  subCategory: z.string({
    required_error: "Please select a type of Product.",
  }),
  stock: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  discount: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  price: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  sale_price: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  status: z.boolean(),
  image: z
    .array(
      z.object({
        type: z.string(),
        name: z.string(),
      }),
    )
    .min(1, { message: "At least one image is required." })
    .refine(
      (files) =>
        files.every((file) =>
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            file.type,
          ),
        ),
      {
        message: "Only .jpg, .jpeg, .png, and .webp files are accepted.",
      },
    ),
});

export default function AddProduct() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      image: undefined,
      unit: "",
      description: "",
      discount: "",
      price: "",
      status: false,
      sale_price: "",
      stock: "",
      category: "",
      subCategory: "",
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("values", data);
  }

  const subCategoryTypes = [
    { label: "Egges", value: "cat-1" },
    { label: "Munchies", value: "cat-2" },
    { label: "Fruits", value: "cat-3" },
    { label: "Cold", value: "cat-4" },
    { label: "Milk", value: "cat-4" },
  ] as const;

  return (
    <Card className="mx-6 mb-10 p-6">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div>
              <h1 className="text-xl font-semibold text-secondary/70">
                Product Information
              </h1>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
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
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
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
                  name="subCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Sub_Category</FormLabel>
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
                          {subCategoryTypes.map((item) => (
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
              </div>
              <div className="my-6">
                <h1 className="mb-4 text-xl font-semibold text-secondary/70">
                  Product Image
                </h1>
                <Dropzone
                  onDrop={(acceptedFiles: File[]) => {
                    console.log("Accepted image files:", acceptedFiles);
                  }}
                  accept={ACCEPTED_IMAGE_TYPES}
                >
                  {(dropzone: DropzoneState) => (
                    <>
                      {dropzone.isDragAccept ? (
                        <div className="text-sm font-medium">
                          Drop your files here!
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="flex flex-row items-center gap-0.5 text-sm font-medium">
                            Upload files
                          </div>
                        </div>
                      )}
                      <div className="ml-2 text-xs font-medium text-gray-400">
                        {dropzone.acceptedFiles.length} files uploaded so far.
                      </div>
                    </>
                  )}
                </Dropzone>
              </div>
              <div className="my-6">
                <h1 className="mb-4 text-xl font-semibold text-secondary/70">
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
              </div>
              {/* gird */}
              <div className="mb-6 grid gap-10 md:grid-cols-2">
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
                      name="sale_price"
                      render={({ field }) => (
                        <FormItem>
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
                        <FormItem className="my-2">
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
              </div>
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
