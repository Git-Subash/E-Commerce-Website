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
    <div className="py-10 flex  items-center justify-center w-full dark:bg-gray-950">
      <Card className=" bg-white flex flex-col gap-10 dark:bg-gray-900 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] rounded-xl px-8  max-w-xl">
        <h1 className="text-3xl mt-10 font-bold text-center mb-4 dark:text-gray-200">
          Welcome Back!
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="pb-24 w-[350px] sm:w-[500px]">
            <div className="mb-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block  text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-sm rounded-md w-full  px-4 py-6 border border-gray-300 focus:outline-none focus:border-none focus:ring-indigo-500 focus:border-indigo-500"
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
              <Link
                to="/forgot-password"
                className="text-xs  text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="px-8 py-6 w-full rounded-md bg-primary text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-primary">
              Login{" "}
              {form.formState.isSubmitting && (
                <Loader className="ml-2 h-6 w-6 animate-spin" />
              )}
            </Button>
            <div className="w-full flex justify-center mt-4">
              <Link
                to="/register"
                className="text-sm  flex gap-1  text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
