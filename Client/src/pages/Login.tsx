import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import fetchUserDetails from "@/lib/fetchUserDetails";
import { setUserDetails } from "@/store/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid Email."),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if (response.data) {
        form.reset();
        navigate("/");
        //adding the userdetails to the persist
        const userDetails = await fetchUserDetails();
        if (userDetails?.data) {
          dispatch(setUserDetails(userDetails.data));
          console.log("User details fetched successfully:");
        } else {
          console.error("Error fetching user details:");
        }
        toast({
          variant: "default",
          title: "Login successful ",
          description: "Welcome back! You have successfully logged in.",
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
    <div className="flex w-full items-center justify-center py-10 dark:bg-gray-950">
      <Card className="flex max-w-xl flex-col gap-10 rounded-xl bg-white px-8 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] dark:bg-gray-900">
        <h1 className="mb-4 mt-10 text-center text-3xl font-bold dark:text-gray-200">
          Welcome Back!
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[350px] pb-24 sm:w-[500px]"
          >
            <div className="mb-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full rounded-md border border-gray-300 px-4 py-6 shadow-sm focus:border-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                        placeholder="your@email.com"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full rounded-md border border-gray-300 px-4 py-6 shadow-sm focus:border-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link
                to="/forgot-password"
                className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full rounded-md border-2 border-transparent bg-primary px-8 py-6 font-bold text-white transition duration-200 hover:border-primary hover:bg-white hover:text-black"
            >
              Login{" "}
              {form.formState.isSubmitting && (
                <Loader className="ml-2 h-6 w-6 animate-spin" />
              )}
            </Button>
            <div className="mt-4 flex w-full justify-center">
              <Link
                to="/register"
                className="flex gap-1 text-sm text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="text-foreground hover:no-underline">
                  Don't have an account yet?
                </span>
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
