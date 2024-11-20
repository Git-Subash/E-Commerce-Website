import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import Header from "@/components/Header";
import Side from "@/components/Side";
import { Outlet } from "react-router-dom";
import GlobleContextProvider from "@/context/GlobleContextProvider";

export default function Profile() {
  return (
    <GlobleContextProvider>
      <MaxWidthWrapper>
        <div className="grid  w-full py-6  md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="md:flex hidden h-14 gap-4 md:min-h-screen mr-4 border-r  rounded-lg border-b bg-muted/40   ">
            <Side />
          </div>
          <div className="flex w-full   h-14 gap-4 md:min-h-screen   border-b border-r  rounded-lg  bg-muted/40  ">
            <Header />
          </div>
          <div className="md:hidden ">
            <Outlet />
          </div>
        </div>
      </MaxWidthWrapper>
    </GlobleContextProvider>
  );
}
