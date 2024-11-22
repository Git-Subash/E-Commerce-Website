import { SummaryApi } from "@/constants/SummaryApi";
import Axios from "@/lib/Axios";
import { cn } from "@/lib/utils";
import { persist, RootState } from "@/store/store";
import { logout } from "@/store/userSlice";
import {
  AlignRight,
  LogIn,
  LogOut,
  ShoppingCartIcon,
  UserRound,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartDrawer from "./CartDrawer";
import MaxWidthWrapper from "./MaxWidthWrapper";
import MobileNav from "./MobileNav";
import SearchInput from "./SearchInput";
import { Badge } from "./ui/badge";
import { buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = user?._id;

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });

      console.log("Logout", response);
      if (response.data) {
        persist.purge(); // Ensure purge happens first
        dispatch(logout()); // clear the redux store state
        navigate("/login"); // navigate to loginPage}
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className=" h-40 md:h-28 shadow-md sticky top-0 z-40  gap-1 bg-white">
      <div className="w-full bg-primary/20 flex justify-center md:justify-between  h-8">
        <MaxWidthWrapper className="  flex justify-center  items-center text-sm">
          <p>Super Value Deals - Save more with coupons</p>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper className="mx-auto flex  items-center gap-16 ">
        <div className="flex flex-col md:flex-row mb-4 items-center justify-between w-full gap-x-10 gap-y-2">
          <div className=" flex items-center  w-full justify-between ">
            <Link to="/">
              <div className="flex items-center">
                <img
                  src="/logo.png"
                  className="h-16 md:h-20"
                  alt="Shopme-logo"
                />
              </div>
            </Link>

            <div className="md:hidden flex items-center gap-3 ">
              <Link
                className="flex items-center text-primary/50  gap-2"
                to={isLoggedIn ? "/profile-page/user-details" : "/login"}>
                <UserRound className="bg-primary/20 w-10 p-2 rounded-full h-10" />
              </Link>

              <CartDrawer
                button={
                  <button className="flex items-center relative text-primary/50  gap-4">
                    <ShoppingCartIcon className="bg-primary/20 w-10 p-2 rounded-full h-10" />
                    <Badge
                      className="absolute p-0.5 px-1.5 -top-1 -right-2 "
                      variant="secondary">
                      0
                    </Badge>
                  </button>
                }
              />

              <MobileNav button={<AlignRight />} />
            </div>
          </div>

          <div className="w-full  min-w-[300px]  ">
            <SearchInput />
          </div>
          <div className="hidden md:flex items-center gap-3">
            <CartDrawer
              button={
                <button className="flex items-center relative text-primary/50  gap-4">
                  <ShoppingCartIcon className="bg-primary/20 w-10 p-2 rounded-full h-10" />
                  <Badge
                    className="absolute p-0.5 px-1.5 -top-1 -right-2 "
                    variant="secondary">
                    0
                  </Badge>
                </button>
              }
            />

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Link
                    className="flex items-center text-primary/50  gap-2"
                    to={isLoggedIn ? "/profile-page/user-details" : "/login"}>
                    <UserRound className="bg-primary/20 w-10 p-2 rounded-full h-10" />
                  </Link>
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
                className={cn(
                  "!text-md",
                  buttonVariants({ variant: "default" })
                )}>
                Login
              </Link>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
