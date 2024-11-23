import { cn } from "@/lib/utils";
import { House } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { dashboardLinks } from "./DashboardHeder";

export default function DashboardSide() {
  const location = useLocation();
  return (
    <aside className=" hidden  w-full  md:flex  max-h-screen flex-col gap-2">
      <div className=" ">
        <nav className=" text-lg font-medium  ">
          <Link to="/">
            <img src="/logo.png" className="h-20  " alt="Shopme-logo" />
          </Link>
          <div className="flex flex-col w-full   px-2.5">
            <Link
              to="/dashboard-page"
              className={cn(
                "flex items-center w-full  text-sm gap-3 rounded-lg mb-4  transition-all p-4   ",
                location.pathname === "/dashboard-page"
                  ? " bg-primary/20  "
                  : "hover:bg-accent"
              )}>
              <House className="h-4 w-4" />
              Dashboard
            </Link>
            <p className="text-sm text-secondary/70 p-4">Store Managements </p>
            {dashboardLinks.map((item, index) => (
              <Link
                key={index}
                to={item.to}
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
      </div>
    </aside>
  );
}
