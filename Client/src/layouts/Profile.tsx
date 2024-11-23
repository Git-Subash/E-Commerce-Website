import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import Header from "@/components/Header";
import Side from "@/components/Side";
import { Outlet } from "react-router-dom";
import GlobleContextProvider from "@/context/GlobleContextProvider";

export default function Profile() {
  return (
    <GlobleContextProvider>
      <MaxWidthWrapper>
        <div className="grid  w-full   md:grid-cols-[260px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="md:flex hidden justify-center   md:min-h-screen  border-r  rounded-lg   ">
            <Side />
          </div>
          <div className="flex w-full   h-14 mt-10 gap-4 md:min-h-screen   border-b px-2.5  rounded-lg    ">
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
