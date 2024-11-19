import { cn } from "@/lib/utils";
import {
  AlignRight,
  LogIn,
  LogOut,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/store/userSlice";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = user?._id;

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/login"); // Change the route to your desired page
  };

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
                  {!isLoggedIn ? (
                    <AlignRight />
                  ) : (
                    <Avatar>
                      <AvatarImage
                        // src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="sm:hidden block">
                  <DropdownMenuItem>
                    <Link
                      className="flex items-center w-full  gap-4"
                      to="/cart">
                      <ShoppingCart />
                      Cart
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      className="flex items-center w-full  gap-2"
                      to="/profile-page/user-details">
                      <UserRound />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {!isLoggedIn ? (
                      <Link
                        className="flex  items-center gap-2 w-full"
                        to="/login">
                        <LogIn />
                        Login
                      </Link>
                    ) : (
                      <Link
                        to="/login"
                        onClick={handleLogout}
                        className="flex w-full items-start gap-2">
                        <LogOut /> Logout
                      </Link>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Link>
          <div className="w-full  min-w-[300px]  ">
            <SearchInput />
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <Link to="/cart">
              <ShoppingCart />
            </Link>
            {isLoggedIn ? (
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
                <DropdownMenuContent className="hidden sm:block">
                  <DropdownMenuItem>
                    <Link
                      className="flex items-center w-full  gap-2"
                      to="/profile-page/user-details">
                      <UserRound />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {!isLoggedIn ? (
                      <Link
                        className="flex items-center w-full gap-2"
                        to="/login">
                        <LogIn />
                        Login
                      </Link>
                    ) : (
                      <Link
                        to="/login"
                        onClick={handleLogout}
                        className="flex w-full items-start gap-2">
                        <LogOut /> Logout
                      </Link>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/login"
                className={cn(buttonVariants({ variant: "default" }))}>
                Login
              </Link>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
