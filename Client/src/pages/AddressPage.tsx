import AddAddress from "@/components/AddAddress";
import EditAddress from "@/components/EditAddress";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SummaryApi } from "@/constants/SummaryApi";
import { useGlobleContext } from "@/context/GlobleContextProvider";
import { useToast } from "@/hooks/use-toast";
import Axios from "@/lib/Axios";
import { deleteAddress, updateAddressStatus } from "@/store/addressSlice";
import { RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddressPage() {
  const addressList = useSelector(
    (state: RootState) => state.address.addressList
  );
  const { fetchAddress } = useGlobleContext();
  const { toast } = useToast();
  const dispatch = useDispatch();

  //updating stauts
  const handleAddressStatus = async (id: any) => {
    try {
      const selectedAddress = addressList.find((item) => item._id === id);
      if (!selectedAddress || selectedAddress.status) return;

      const response = await Axios({
        ...SummaryApi.update_address_status,
        data: {
          _id: id,
          status: true,
        },
      });
      if (response.data.success) {
        // Update Redux: Set the clicked address's status to true and all others to false
        dispatch(
          updateAddressStatus({
            _id: id,
            status: true,
          })
        );
        console.log("status updated success");
        if (fetchAddress) {
          fetchAddress();
        }
      }
    } catch (error) {}
  };
  //delete address
  const handleDeleteAddress = async (id: any, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      const response = await Axios({
        ...SummaryApi.delete_address,
        data: {
          _id: id,
        },
      });
      if (response.data.success) {
        console.log("data:", response.data);
        dispatch(deleteAddress());
        toast({
          variant: "default",
          title: "Address Removed successful ",
          description:
            "Your address has been added to the account successfully.",
        });
        if (fetchAddress) {
          fetchAddress();
        }
      }
    } catch (error) {}
  };

  return (
    <div className=" relative px-2.5 md:px-4 w-full ">
      <div className="flex pt-10 pb-10 md:pb-10 md:pt-0   justify-between items-center">
        <h1 className="text-3xl px-4 font-semibold  ">My Address</h1>
        <AddAddress />
      </div>
      <ScrollArea className="h-[600px] mt-8 ">
        <div className="flex mt-5 flex-wrap justify-center gap-3 mb-10 w-full">
          {addressList.map((item: any, index: any) => (
            <label
              onClick={() => handleAddressStatus(item._id)}
              key={index}
              className="cursor-pointer w-full  px-3">
              <input
                type="radio"
                className="peer sr-only"
                name="address"
                checked={item.status}
                onChange={() => handleAddressStatus(item._id)} // Update state on change
              />
              <div
                className={`w-full rounded-md bg-white dark:bg-gray-900 border p-5 text-gray-600 dark:text-gray-300 ring-2 ring-transparent transition-all hover:shadow
                 ${
                   item.status
                     ? "text-green-600 !ring-green-500 ring-offset-2"
                     : ""
                 }`}>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold uppercase text-gray-500 ">
                      {item.address_title}
                    </p>
                    <div>
                      <svg width={24} height={24} viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <p className="text-sm font-bold ">{item.address_line}</p>
                    <p className="text-sm font-bold">
                      {item.city}, <span>{item.country}</span>
                    </p>
                  </div>
                  <p className="text-sm font-bold">{item.mobile},</p>
                </div>
                <div className="w-full gap-2 z-10 flex items-center justify-end">
                  <Button
                    onClick={(e) => handleDeleteAddress(item._id, e)}
                    className=""
                    variant="destructive">
                    Delete
                  </Button>
                  <EditAddress
                    button={
                      <Button onClick={(e) => e.stopPropagation()}>Edit</Button>
                    }
                    data={item}
                  />
                </div>
              </div>
            </label>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
