import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import Axios from "@/lib/Axios";
import { SummaryApi } from "@/constants/SummaryApi";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function OtpVerification() {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  }, []);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
          otp: data.pin,
          email: location?.state?.email,
        },
      });

      if (response.data) {
        navigate("/reset-password", {
          state: {
            data: response.data,
            email: location?.state?.email,
          },
        });
        form.reset();
        toast({
          variant: "default",
          title: "Verification successful ",
          description: "You have successfully verifyed your email.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went Wrong",
        description: "We couldn't able to verify, Please try again.",
      });
    }
  }

  return (
    <div className="py-10 flex items-center justify-center w-full dark:bg-gray-950">
      <div className="bg-white flex flex-col gap-10 dark:bg-gray-900 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] rounded-xl px-8  max-w-xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="pb-24 w-[350px] sm:w-[500px]">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className=" flex flex-col items-center gap-2 sm:gap-4">
                  <FormLabel className="block mt-10 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    One-Time Password
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="sm:gap-4 gap-2 ">
                        <InputOTPSlot
                          className=" !rounded-none !h-12 !w-12  sm:!h-16 sm:!w-16"
                          index={0}
                        />
                        <InputOTPSlot
                          className=" border !h-12 !w-12 sm:!h-16 sm:!w-16"
                          index={1}
                        />
                        <InputOTPSlot
                          className="border  !h-12 !w-12 sm:!h-16 sm:!w-16"
                          index={2}
                        />
                        <InputOTPSlot
                          className="border !h-12 !w-12 sm:!h-16 sm:!w-16"
                          index={3}
                        />
                        <InputOTPSlot
                          className="border !h-12 !w-12 sm:!h-16 sm:!w-16"
                          index={4}
                        />
                        <InputOTPSlot
                          className=" !rounded-none !h-12 !w-12 sm:!h-16 sm:!w-16"
                          index={5}
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your phone.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="px-8 mt-5 py-6 w-full rounded-md bg-primary text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-primary">
              Verify
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
