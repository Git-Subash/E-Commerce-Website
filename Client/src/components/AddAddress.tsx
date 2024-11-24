import DialogForm from "@/components/DialogForm";
import { Button } from "@/components/ui/button";
import { SummaryApi } from "@/constants/SummaryApi";
import { useGlobleContext } from "@/context/GlobleContextProvider";
import { useToast } from "@/hooks/use-toast";
import Axios from "@/lib/Axios";
import { Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const addressSchema = z.object({
  address_title: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),

  address_line: z.string().min(1, { message: "Address is required." }),
  city: z
    .string()
    .min(2, { message: "City must be at least 2 characters long." }),
  state: z
    .string()
    .min(2, { message: "statr must be at least 2 characters long." }),
  pincode: z
    .string()
    .length(6, { message: "Pincode must be exactly 6 digits long." }) // Assumes pincode is a 6-digit number.
    .regex(/^\d+$/, { message: "Pincode must contain only numbers." }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters long." }),
  mobile: z
    .string()
    .length(10, { message: "Mobile number must be exactly 10 digits long." })
    .regex(/^\d+$/, { message: "Mobile number must contain only numbers." }),
});

export default function AddAddress() {
  const { fetchAddress } = useGlobleContext();
  const { toast } = useToast();

  async function handleSubmit(
    data: z.infer<typeof addressSchema>,
    form: UseFormReturn<z.infer<typeof addressSchema>>,
    closeDialog: () => void,
  ) {
    try {
      const response = await Axios({
        ...SummaryApi.add_address,
        data: {
          ...data,
        },
      });

      const { data: responseData } = response;

      if (responseData.data) {
        toast({
          variant: "default",
          title: "Address Added uccessful ",
          description:
            "Your address has been added to the account successfully.",
        });
        closeDialog();
        fetchAddress();
      }
    } catch (error) {
      form.setError("address_title", {
        type: "manual",
        message: "Submission failed.",
      });
      toast({
        variant: "destructive",
        title: "Update Failed",
        description:
          "There was an error updating your profile. Please try again.",
      });
    }
  }
  return (
    <DialogForm
      button={
        <Button
          size="sm"
          className="rounded-md border-2 border-transparent bg-primary font-bold tracking-wider text-white transition duration-200 hover:border-primary hover:bg-white hover:text-black"
        >
          <Plus /> Add
        </Button>
      }
      title="New Address"
      description=" Add a new Address here. Click save when you're done."
      schema={addressSchema}
      defaultValues={{
        address_title: "",
        address_line: "",
        mobile: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
      }}
      fields={[
        {
          name: "address_title",
          label: "Save address as",
          placeholder:
            "Enter a name for your address, e.g., Home, Work, or Other",
        },
        {
          name: "address_line",
          label: "Address",
          placeholder: "Enter your Address",
        },
        { name: "city", label: "City", placeholder: "Enter your  City" },
        { name: "state", label: "State", placeholder: "Enter your  State" },
        {
          name: "country",
          label: "Country",
          placeholder: "Enter your  Country",
        },
        {
          name: "pincode",
          label: "Pincode",
          placeholder: "Enter your  Pincode",
          type: "number",
        },
        {
          name: "mobile",
          label: "Mobile",
          placeholder: "Enter your  Mobile",
          type: "number",
        },
      ]}
      onSubmit={handleSubmit}
    />
  );
}
