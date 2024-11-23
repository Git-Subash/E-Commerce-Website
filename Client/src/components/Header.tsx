import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AlignRight, MapPin, ShoppingBag, User } from "lucide-react";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const links = [
  {
    name: "My Profile",
    to: "/profile-page",
    logo: <User className="h-5 w-5" />,
  },
  {
    name: "Orders",
    to: "/profile-page/order-details",
    logo: <ShoppingBag className="h-5 w-5" />,
  },
  {
    name: "Address",
    to: "/profile-page/address-details",
    logo: <MapPin className="h-5 w-5" />,
  },
];
export default function Header() {
  const [isSheetOpen, isSetSheetOpen] = React.useState<boolean>(false);
  const location = useLocation();

  return (
    <section className="w-full relative mt-2 ">
      <div className="flex w-full justify-between items-center md:hidden ">
        <h1 className="text-xl px-4 font-semibold">Account Setting</h1>
        <Sheet
          open={isSheetOpen}
          onOpenChange={(isOpen) => isSetSheetOpen(isOpen)}>
          <SheetTrigger asChild>
            <AlignRight className="h-7 w-7 cursor-pointer  " />
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col  !w-full p-0 ">
            <nav className="grid gap-2 text-lg font-medium mt-3 mx-10">
              <h1 className="text-xl  font-semibold py-4 mb-4 border-b">
                Account Settings
              </h1>
              {links.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  onClick={() => isSetSheetOpen(false)}
                  className={cn(
                    "flex items-center   gap-3 rounded-lg  transition-all p-2   ",
                    location.pathname === item.to
                      ? " bg-primary/50  "
                      : "hover:bg-accent"
                  )}>
                  {item.logo}
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:block">
        <Outlet />
      </div>
    </section>
  );
}
