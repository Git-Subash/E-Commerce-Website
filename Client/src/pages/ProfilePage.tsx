import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <section className=" relative px-2.5 md:px-4 w-full ">
      <p className="lowercase absolute right-4 top-4  text-green-100 bg-green-500 px-3.5 py-1 rounded-md">
        {user.role}
      </p>
      <h1 className="text-3xl font-semibold py-4 border-b ">Your Profile</h1>
      <img
        src="https://github.com/shadcn.png"
        alt="avatar"
        className="w-24 mt-10 h-24 m-4"
      />
      <div className="mt-12 ">
        <h2 className="font-medium text-lg my-2">Name</h2>
        <p className="my-2">{user.name}</p>
        <h2 className="font-medium text-lg my-2">Email</h2>
        <p className="my-2">{user.email}</p>
        <h2 className="font-medium text-lg my-2">Mobile</h2>
        <p className="my-2">{user.mobile}</p>
        <h2 className="font-medium text-lg my-2">Status</h2>
        <p className="my-2">{user.status}</p>
      </div>
      <Button className="px-8 sm:px-10 mt-10 py-6  sm:w-auto w-full text-xl tracking-wider rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
        Edit
      </Button>
    </section>
  );
}
