import { RootState } from "@/store/store";
import { Package, SquareArrowOutUpRight } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const links = [
  //   { name: "Profile", to: "/update-user" },
  { name: "Orders", to: "/profile-page/order-details" },
  { name: "Address", to: "/profile-page/address-details" },
];

export default function Side() {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);
  let path = location.pathname;
  return (
    <aside className=" hidden  w-full  md:flex  max-h-screen flex-col gap-2">
      <div className="flex   h-14 items-center border-b  lg:h-[60px] ">
        <Link
          to="/profile-page/user-details"
          className="flex items-center px-4 gap-3 font-semibold">
          <Avatar>
            <AvatarImage
              // src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <h1 className="flex flex-col">
            Account{" "}
            <span className="text-xs flex hover:text-blue-600 items-center  gap-1">
              {user.name}
              <SquareArrowOutUpRight className="w-2.5 h-2.5 mt-0.5" />{" "}
            </span>
          </h1>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="group grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
          {links.map((item, index) => (
            <>
              <Link
                key={index}
                to={item.to}
                className={
                  path === item.to
                    ? "flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2.5 hover:text-primary transition-all hover:bg-accent"
                    : "flex scale-100 items-center gap-3 rounded-lg px-3 py-2.5 hover:text-primary  hover:bg-accent"
                }>
                <Package className="h-4 w-4" />
                {item.name}
              </Link>
            </>
          ))}
        </nav>
      </div>
    </aside>
    // </aside>
  );
}
