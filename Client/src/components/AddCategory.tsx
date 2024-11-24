import { SummaryApi } from "@/constants/SummaryApi";
import { useToast } from "@/hooks/use-toast";
import Axios from "@/lib/Axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const Schema = z.object({
  name: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  status: z.boolean(),
  image: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted.",
    )
    .refine((files) => files.length > 0, `Required`),
});

export default function AddCategory() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: "",
      image: undefined,
      status: false,
    },
  });
  const imageRef = form.register("image");

  async function onSubmit(data: z.infer<typeof Schema>) {
    const formData = new FormData();

    formData.append("image", data.image[0]);
    formData.append("name", data.name);
    formData.append("status", String(data.status));

    try {
      const response = await Axios({
        ...SummaryApi.add_Category,
        data: formData,
      });

      const { data: responseData } = response;

      if (responseData.data) {
        form.reset();
        navigate("/dashboard-page/category");
        window.location.reload();
        // dispatch(setCategory(responseData.data));
        toast({
          title: "Category Uploaded",
          description: "Your Profile has been created successfully.",
        });
      }
    } catch (error) {
      toast({
        variant: "default",
        title: "Upload Failed",
        description: "Your Profile has been created successfully.",
      });
    }
  }
  return (
    <Card className="mt-4 border-none">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Category */}
            <Card>
              <CardContent className="my-4 p-4">
                <h1 className="mb-6 text-xl font-semibold text-secondary/70">
                  Category Information
                </h1>
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem className="my-4">
                      <FormLabel>Add Image</FormLabel>
                      <FormControl>
                        <Input
                          accept=".jpg,.png,.jpeg,.webp"
                          type="file"
                          {...imageRef}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Category </FormLabel>
                      <FormControl>
                        <Input placeholder="Category Name" {...field} />
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
      </CardContent>
    </Card>
  );
}
