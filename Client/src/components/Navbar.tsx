import { cn } from "@/lib/utils";
import { LogIn, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthWrapper";
import SearchInput from "./SearchInput";
import { buttonVariants } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Navbar() {
  return (
    <header className=" h-28 sm:h-20 shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      <MaxWidthWrapper className="mx-auto flex h-24 items-center gap-16 ">
        <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-x-10 gap-y-2">
          <Link className=" flex items-center justify-between w-full" to="/">
            <div className="flex items-center">
              <img
                src="/vite.svg"
                className="mr-3 h-8 sm:h-10"
                alt="Shopme-logo"
              />

              <span className="font-bootle self-center whitespace-nowrap font-medium tracking-wide sm:text-xl">
                Shopme
              </span>
            </div>
            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      //   src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link className="flex items-center  gap-4" to="/cart">
                      <ShoppingCart />
                      Cart
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link className="flex items-center gap-2" to="/login">
                      <LogIn />
                      Login
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Link>
          <div className="w-full  min-w-[300px]  ">
            <SearchInput />
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <Link to="/cart">
            <ShoppingCart />
          </Link>
          <Link
            to="/login"
            className={cn(buttonVariants({ variant: "default" }))}>
            Login
          </Link>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
