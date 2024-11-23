import AddProfileImage from "@/components/AddProfileImage";
import DialogForm from "@/components/DialogForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SummaryApi } from "@/constants/SummaryApi";
import { useToast } from "@/hooks/use-toast";
import Axios from "@/lib/Axios";
import fetchUserDetails from "@/lib/fetchUserDetails";
import { RootState } from "@/store/store";
import { setUserDetails } from "@/store/userSlice";
import { Pencil } from "lucide-react";
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
  const addressList = useSelector(
    (state: RootState) => state.address.addressList
  );

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
      <div className="flex pb-10 pt-10 md:pb-10 md:pt-0  justify-between items-center">
        <h1 className="text-3xl px-4 font-semibold  ">My Profile</h1>

        <DialogForm
          button={
            <Button
              size="sm"
              className="tracking-wider rounded-md bg-primary text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-primary">
              <Pencil /> Edit
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
            {
              name: "email",
              label: "Email",
              placeholder: "Enter your email",
            },
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
      </div>
      {/* Profile Card */}
      <Card className="flex   shadow-none relative flex-row  border-none p-3  gap-4 items-center  mr-auto w-auto ">
        <div className=" flex justify-center items-center">
          <AddProfileImage />
        </div>
        <div className=" ">
          <h3 className="font-medium text-md ">
            <span className="font-semibold text-xl">{user?.name} </span>
          </h3>
          <h3 className="font-medium text-sm text-secondary/50 ">
            {user?.status}
          </h3>
          <h3 className="font-medium text-sm text-primary/50 ">
            Role : {user?.role}
          </h3>
        </div>
      </Card>
      {/* Personal Information */}
      <section className="py-6">
        <h2 className="text-xl font-semibold mb-4 px-4">
          Personal Information
        </h2>
        <Card className="p-4 shadow-none border-none">
          <div className="mb-4">
            <h3 className="text-secondary/50 font-semibold">Name</h3>
            <p className="text-secondary/70 font-medium">{user?.name}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-secondary/50 font-semibold">Email</h3>
            <p className="text-secondary/70 font-medium">{user?.email}</p>
          </div>
          <div>
            <h3 className="text-secondary/50 font-semibold">Mobile</h3>
            <p className="text-secondary/70 font-medium">{user?.mobile}</p>
          </div>
        </Card>
      </section>
      {/* Address Section */}
      <section className="py-6 ">
        <h2 className="text-xl font-semibold px-4 mb-4">Address</h2>
        <Card className="p-4 shadow-none border-none">
          {addressList
            .filter((item) => item.status == true) // Show only active addresses
            .map((item, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-secondary/50 font-semibold">
                    Address Line
                  </h3>
                  <p className="text-secondary/70 font-medium">
                    {item.address_line}
                  </p>
                </div>
                <div>
                  <h3 className="text-secondary/50 font-semibold">City</h3>
                  <p className="text-secondary/70 font-medium">{item.city}</p>
                </div>
                <div>
                  <h3 className="text-secondary/50 font-semibold">State</h3>
                  <p className="text-secondary/70 font-medium">
                    {item.state} - {item.pincode}
                  </p>
                </div>
                <div>
                  <h3 className="text-secondary/50 font-semibold">Country</h3>
                  <p className="text-secondary/70 font-medium">
                    {item.country}
                  </p>
                </div>
              </div>
            ))}
        </Card>
      </section>
    </section>
  );
}
