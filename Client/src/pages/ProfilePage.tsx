import AddProfileImage from "@/components/AddProfileImage";
import DialogForm from "@/components/DialogForm";
import { Button } from "@/components/ui/button";
import { SummaryApi } from "@/constants/SummaryApi";
import { useToast } from "@/hooks/use-toast";
import Axios from "@/lib/Axios";
import fetchUserDetails from "@/lib/fetchUserDetails";
import { RootState } from "@/store/store";
import { setUserDetails } from "@/store/userSlice";
import { UseFormReturn } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

const ProfileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid Email."),
  mobile: z.string().max(10, { message: "mobile must be at least 10 number." }),
  password: z
    .string()
    .optional()
    .refine((value) => !value || value.length >= 8, {
      message: "Password must be at least 8 characters long.",
    }),
});

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state?.user);
  const { toast } = useToast();
  const dispatch = useDispatch();

  async function handleSubmit(
    data: z.infer<typeof ProfileSchema>,
    form: UseFormReturn<z.infer<typeof ProfileSchema>>,
    closeDialog: () => void
  ) {
    try {
      const response = await Axios({
        ...SummaryApi.update_user_details,
        data: data,
      });

      if (response.data) {
        toast({
          variant: "default",
          title: "Registration Successful ",
          description:
            "Your account has been created successfully. Welcome aboard!",
        });
        closeDialog();
        const userDetails = await fetchUserDetails();
        if (userDetails?.data) {
          dispatch(setUserDetails(userDetails.data));
          window.location.reload();
          console.log("User details fetched successfully:");
        } else {
          console.error("Error fetching user details:");
        }
      }
    } catch (error) {
      form.setError("name", { type: "manual", message: "Submission failed." });
      toast({
        variant: "destructive",
        title: "Update Failed",
        description:
          "There was an error updating your profile. Please try again.",
      });
    }
  }
  return (
    <section className=" relative px-2.5 md:px-4 w-full ">
      <p className="lowercase absolute right-4 top-4  text-green-100 bg-green-500 px-3.5 py-1 rounded-md">
        {user.role}
      </p>
      <h1 className="text-3xl font-semibold py-4 border-b ">Your Profile</h1>
      <AddProfileImage />
      <div className="mt-12 ">
        <h2 className="font-medium text-lg my-2">Name</h2>
        <p className="my-2">{user?.name}</p>
        <h2 className="font-medium text-lg my-2">Email</h2>
        <p className="my-2">{user?.email}</p>
        <h2 className="font-medium text-lg my-2">Mobile</h2>
        <p className="my-2">{user?.mobile}</p>
        <h2 className="font-medium text-lg my-2">Status</h2>
        <p className="my-2">{user?.status}</p>
      </div>
      <DialogForm
        button={
          <Button className="px-8 sm:px-10 mt-10 py-6  sm:w-auto w-full text-xl tracking-wider rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
            Edit
          </Button>
        }
        title="Edit Profile"
        description=" Make changes to your profile here. Click save when you're done."
        schema={ProfileSchema}
        defaultValues={{
          name: user.name || "",
          mobile: user.mobile || "",
          email: user.email || "",
          password: "",
        }}
        fields={[
          { name: "name", label: "Name", placeholder: "Enter your Name" },
          { name: "email", label: "Email", placeholder: "Enter your email" },
          {
            name: "mobile",
            label: "Mobile",
            placeholder: "Enter your mobile",
            type: "number",
          },
          {
            name: "password",
            label: "Password",
            placeholder: "Enter your password",
            type: "password",
          },
        ]}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
