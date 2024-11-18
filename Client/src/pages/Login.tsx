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
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid Email."),
  password: z.string().max(8),
});

export default function Login() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      console.log(data);
      form.reset();
      toast({
        variant: "default",
        title: "Message Received",
        description:
          "Thank you for reaching out! We will get back to you shortly",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Message Not Sent",
        description: "We couldn't send your message. Please try again later.",
      });
    }
  }
  return (
    <div className="my-10 flex items-center justify-center w-full dark:bg-gray-950">
      <div className="bg-white flex flex-col gap-10 dark:bg-gray-900 shadow-2xl rounded-lg px-8  max-w-xl">
        <h1 className="text-3xl mt-10 font-bold text-center mb-4 dark:text-gray-200">
          Welcome Back!
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="pb-24">
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
                        className="shadow-sm rounded-md w-full md:pr-52 pr-36 py-6 border border-gray-300 focus:outline-none focus:border-none focus:ring-indigo-500 focus:border-indigo-500"
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
                        className="shadow-sm rounded-md w-full md:pr-52 pr-36 py-6 border border-gray-300 focus:outline-none focus:border-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link
                to="forgotPassword"
                className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="px-8 py-6 w-full rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
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
      </div>
    </div>
  );
}
