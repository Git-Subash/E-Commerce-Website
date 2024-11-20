import { SummaryApi } from "@/constants/SummaryApi";
import Axios from "@/lib/Axios";
import { handleAddAddress } from "@/store/addressSlice";
import { RootState } from "@/store/store";
import React, { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

// Define type for the context
type GlobleContextType = {
  fetchAddress: () => Promise<void>;
};

// Creating the context
export const GlobleContext = React.createContext<GlobleContextType | null>(
  null
);

// Custom hook to use the context
export const useGlobleContext = () => {
  const context = React.useContext(GlobleContext);
  if (!context) {
    throw new Error("useGlobleContext must be used within a GlobleProvider");
  }
  return context;
};

const GlobleProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const fetchAddress = async () => {
    try {
      const response = await Axios({ ...SummaryApi.get_address });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddAddress(responseData.data));
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      // Handle errors, e.g., show a toast
    }
  };

  React.useEffect(() => {
    if (user && user._id) {
      fetchAddress();
    }
  }, [user]);

  return (
    <GlobleContext.Provider value={{ fetchAddress }}>
      {children}
    </GlobleContext.Provider>
  );
};

export default GlobleProvider;
