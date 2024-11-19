import { SummaryApi } from "@/constants/SummaryApi";
import Axios from "./Axios";

const fetchUserDetails = async () => {
  try {
    const res = await Axios({
      ...SummaryApi.userDetails,
    });
    if (res.status === 200) {
      // Handle success response
      return res.data; // Return data to the calling function
    } else {
      // Handle unexpected status codes
      return { error: true, message: "Unexpected response status." };
    }
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserDetails;
