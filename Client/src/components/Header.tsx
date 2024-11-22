import { Button } from "@/components/ui/button";
import { Menu, Package, SquareArrowOutUpRight } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const links = [
  { name: "Orders", to: "/profile-page/order-details" },
  { name: "Address", to: "/profile-page/address-details" },
];

export default function Header() {
  const user = useSelector((state: RootState) => state.user);
  const [isSheetOpen, isSetSheetOpen] = React.useState<boolean>(false);
  const location = useLocation();

  return (
    <section className="w-full">
      <Sheet
        open={isSheetOpen}
        onOpenChange={(isOpen) => isSetSheetOpen(isOpen)}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className=" md:hidden ml-4 ">
            <Menu className="h-5 w-5 " />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col !w-full pt-0">
          <nav className="grid gap-2 text-lg font-medium mt-3">
            <div className="flex  h-14 items-center lg:h-[60px] ">
              <Link
                to="/profile-page/user-details"
                onClick={() => isSetSheetOpen(false)}
                className="flex items-center px-4 gap-3 font-semibold">
                <Avatar>
                  <AvatarImage
                    src={user.avatar || "/default-avatar.png"}
                    alt="avatar"
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
            <Separator />

            {links.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                onClick={() => isSetSheetOpen(false)}
                className={
                  location.pathname === item.to
                    ? "flex items-center gap-3 rounded-lg bg-primary/50 px-3 py-2.5  transition-all "
                    : "flex scale-100 items-center gap-3  rounded-lg px-3 py-2.5   hover:bg-accent"
                }>
                <Package className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="hidden md:block">
        <Outlet />
      </div>
    </section>
  );
}
