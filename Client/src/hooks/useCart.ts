import { SummaryApi } from "@/constants/SummaryApi";
import Axios from "@/lib/Axios";

export function useCart() {
  const addToCart = async (id: string) => {
    try {
      const response = await Axios({
        ...SummaryApi.add_cart,
        data: {
          productId: id,
        },
      });

      if (response) {
        console.log("cart is added to the database", response.data);

        // setCartState((prev: any) => ({
        //   ...prev,
        //   [id]: true, // Mark this product as added
        // }));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { addToCart };
}
