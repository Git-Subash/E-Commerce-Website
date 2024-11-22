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
import { SummaryApi } from "@/constants/SummaryApi";
import { useToast } from "@/hooks/use-toast";
import Axios from "@/lib/Axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

const FormSchema = z
  .object({
    password: z.string().max(8, { message: "This field has to be filled." }),
    confirmPassword: z
      .string()
      .max(8, { message: "This field has to be filled." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export default function ResetPassword() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await Axios({
        ...SummaryApi.reset_password,
        data: {
          email: location?.state?.email,
          newPassword: data.password,
          confirmPassword: data.confirmPassword,
        },
      });
      if (response.data) {
        form.reset();
        navigate("/login");
        return toast({
          variant: "default",
          title: " Password Reset Successful ",
          description:
            "Your Password has been modifiyed successfully. Welcome aboard!",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went Wrong",
        description: "We couldn't able to sign. Please try again.",
      });
    }
  }
  return (
    <div className="my-10 flex items-center justify-center w-full dark:bg-gray-950">
      <div className="bg-white flex flex-col gap-10 dark:bg-gray-900 shadow-2xl rounded-lg px-8  max-w-xl">
        <h1 className="text-3xl mt-10 font-bold text-center mb-4 dark:text-gray-200">
          Enter New Password
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="pb-24 w-[350px] sm:w-[500px] ">
            <div className="mb-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block  text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-sm rounded-md w-full px-4 py-6 border border-gray-300 focus:outline-none focus:border-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block  text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-sm rounded-md w-full px-4 py-6 border border-gray-300 focus:outline-none focus:border-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="px-8 py-6 w-full rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
              Register
              {form.formState.isSubmitting && (
                <Loader className="ml-2 h-6 w-6 animate-spin" />
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
