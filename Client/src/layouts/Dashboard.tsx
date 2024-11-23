import DashboardHeader from "@/components/DashboardHeder";
import DashboardSide from "@/components/DashboardSide";
import GlobleContextProvider from "@/context/GlobleContextProvider";
import { Outlet } from "react-router-dom";

export default function Dasboard() {
  return (
    <GlobleContextProvider>
      <div>
        <div className="grid  w-full   xl:grid-cols-[300px_1fr] ">
          <div className="xl:flex hidden justify-center   xl:h-auto   border-r  rounded-lg   ">
            <DashboardSide />
          </div>
          <div className="flex w-full overflow-hidden  h-20 xl:items-start   border-b items-center  xl:h-auto justify-center  px-5 xl:px-5  ">
            <DashboardHeader />
          </div>
          <div className=" xl:hidden ">
            <Outlet />
          </div>
        </div>
      </div>
    </GlobleContextProvider>
  );
}
