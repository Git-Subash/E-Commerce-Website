import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { SummaryApi } from "@/constants/SummaryApi";
import { useToast } from "@/hooks/use-toast";
import Axios from "@/lib/Axios";
import fetchUserDetails from "@/lib/fetchUserDetails";
import { RootState } from "@/store/store";
import { setUserDetails } from "@/store/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, UserRoundPen } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const imageSchema = z.object({
  image: z

    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted.",
    )
    .refine((files) => files.length > 0, `Required`),
});
export default function AddProfileImage() {
  const user = useSelector((state: RootState) => state.user);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  //react-form-hook
  const form = useForm<z.infer<typeof imageSchema>>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      image: undefined,
    },
  });

  const imageRef = form.register("image");

  const handleClose = () => {
    setIsDialogOpen(false);
    form.reset(); // Reset the form upon dialog close
  };

  async function onSubmit(data: z.infer<typeof imageSchema>) {
    const image = new FormData();

    image.append("image", data.image[0]);

    try {
      const response = await Axios({
        ...SummaryApi.upload_avatar,
        data: image,
      });

      if (response.data) {
        const userDetails = await fetchUserDetails();
        if (userDetails?.data.avatar) {
          dispatch(setUserDetails({ avatar: userDetails.data.avatar }));

          // window.location.reload();
          console.log(
            "User details fetched successfully:",
            userDetails.data.avatar,
          );
        } else {
          console.error("Error fetching user details:");
        }
        toast({
          title: "Pofile Image Uploaded",
          description: "Your Profile has been created successfully.",
        });
      }
      handleClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description:
          "There was an error updating your profile. Please try again.",
      });
    }
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => {
        setIsDialogOpen(isOpen);
        form.reset();
      }}
    >
      <DialogTrigger>
        <div className="group relative h-28 w-28 rounded-full border">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="avatar"
            className="h-28 w-28 rounded-full object-contain object-center"
          />
          <UserRoundPen className="absolute right-2 top-2 hidden rounded-full bg-gray-950/80 p-1.5 text-white group-hover:block dark:bg-white dark:text-gray-950" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-lg rounded-md">
        <DialogHeader>
          <DialogTitle className="flex justify-start">
            Add Profile Image
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Add Profile</FormLabel>
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

            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="w-full tracking-wide"
            >
              Save
              {form.formState.isSubmitting && (
                <Loader className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
