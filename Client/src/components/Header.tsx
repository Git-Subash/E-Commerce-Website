import { FolderKanban, Menu, Package2, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, Outlet } from "react-router-dom";

export default function Header() {
  return (
    <section className="w-full">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className=" md:hidden ml-4 ">
            <Menu className="h-5 w-5 " />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              to="#"
              className="flex items-center gap-2 text-lg font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>

            <Link
              to="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <PackageSearch className="h-4 w-4" />
              Products
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <FolderKanban className="h-4 w-4" />
              Projects
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="hidden md:block">
        <Outlet />
      </div>
    </section>
  );
}
