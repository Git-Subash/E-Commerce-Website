import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  AlignLeft,
  House,
  List,
  ListTree,
  LogOut,
  ShoppingBag,
  ShoppingCartIcon,
  Users,
} from "lucide-react";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const dashboardLinks = [
  {
    name: "Products",
    to: "/dashboard-page/products",
    logo: <ShoppingCartIcon className="h-4 w-4" />,
  },
  {
    name: "Categories",
    to: "/dashboard-page/categoties",
    logo: <List className="h-4 w-4" />,
  },
  {
    name: "Sub_Categories",
    to: "/dashboard-page/sub-categoties",
    logo: <ListTree className="h-4 w-4" />,
  },
  {
    name: "Orders",
    to: "/dashboard-page/orders",
    logo: <ShoppingBag className="h-4 w-4" />,
  },
  {
    name: "Customers",
    to: "/dashboard-page/customers",
    logo: <Users className="h-4 w-4" />,
  },
];
export default function DashboardHeader() {
  const [isSheetOpen, isSetSheetOpen] = React.useState<boolean>(false);
  const location = useLocation();

  return (
    <section className="w-full relative  ">
      <div className="flex w-full justify-between xl:justify-end xl:border-b py-6 items-center">
        <Sheet
          open={isSheetOpen}
          onOpenChange={(isOpen) => isSetSheetOpen(isOpen)}>
          <SheetTrigger asChild>
            <AlignLeft className="h-7 w-7 cursor-pointer xl:hidden  " />
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col !w-72  p-0 ">
            <nav className=" text-lg font-medium  ">
              <Link to="/">
                <img src="/logo.png" className="h-20  " alt="Shopme-logo" />
              </Link>
              <div className="flex flex-col w-full   px-2.5">
                <Link
                  to="/dashboard-page"
                  onClick={() => isSetSheetOpen(false)}
                  className={cn(
                    "flex items-center w-full  text-sm gap-3 rounded-lg mb-4  transition-all p-4   ",
                    location.pathname === "/dashboard-page"
                      ? " bg-primary/20  "
                      : "hover:bg-accent"
                  )}>
                  <House className="h-4 w-4" />
                  Dashboard
                </Link>
                <p className="text-sm text-secondary/70 p-4">
                  Store Managements{" "}
                </p>
                {dashboardLinks.map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    onClick={() => isSetSheetOpen(false)}
                    className={cn(
                      "flex items-center w-full  text-sm gap-3 rounded-lg  transition-all p-4   ",
                      location.pathname === item.to
                        ? " bg-primary/20  "
                        : "hover:bg-accent"
                    )}>
                    {item.logo}
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="px-2.5">
            <DropdownMenuLabel className="text-md">
              Shopme Admin
              <p className="text-xs">subashotherp11@gmail.com</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="mt-2">
              <Link className="flex items-center w-full  gap-2" to="/">
                Home
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="mb-3">
              <Link
                className="flex items-center w-full  gap-2"
                to="/profile-page">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                to="/login"
                // onClick={handleLogout}
                className="flex w-full text-primary items-center gap-1.5  py-1">
                <LogOut /> Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden xl:block">
        <Outlet />
      </div>
    </section>
  );
}
