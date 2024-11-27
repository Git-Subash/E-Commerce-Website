import { useCart } from "@/hooks/useCart";
import { RootState } from "@/store/store";
import { ArrowRight, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export default function BestSellers() {
  const productList = useSelector(
    (state: RootState) => state.product.productList,
  );
  const categoryList = useSelector(
    (state: RootState) => state.product.categoryList,
  );
  const { addToCart } = useCart();

  // const CartList = useSelector((state: RootState) => state.product.cartList);
  // const [cartState, setCartState] = React.useState<Record<string, boolean>>({});

  const categoryLookup = new Map(
    categoryList.map((category: { _id: string; name: string }) => [
      category._id,
      category.name,
    ]),
  );

  const products = productList.map((product: any) => ({
    _id: product._id,
    name: product.name,
    to: "/",
    image: product.image[0] || "default.jpg",
    category: categoryLookup.get(product.categoryId), // Look
    price: product.price,
    salePrice: product.salePrice,
  }));

  async function AddtoCart(id: string) {
    try {
      await addToCart(id);
    } catch (error) {
      console.log("error accured in addToCart action");
    }
  }

  return (
    <MaxWidthWrapper className="my-10 flex flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-bold">Best Sellers</h1>
        <Link
          to="/"
          className="group flex items-center gap-1 rounded-full bg-primary/20 px-4 md:mt-2"
        >
          See More{" "}
          <ArrowRight className="h-10 w-10 rounded-full p-2.5 transition-all duration-300 group-hover:translate-x-2" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((_item, _index) => (
          <Link to={_item.to} className=" ">
            <Card className="mt-6 p-4">
              <img src={_item.image} className="mx-auto h-32 w-32" />
              <div className="mt-4">
                <h1 className="text-xs">{_item.category}</h1>
                <h1 className="text-md font-bold">{_item.name}</h1>
              </div>
              <div className="mt-4 flex w-full items-center justify-between">
                <p className="flex flex-col gap-1.5">
                  ${_item.price}
                  <del className="text-secondary/50">${_item.salePrice}</del>
                </p>

                <Button size="sm" onClick={() => AddtoCart(_item._id)}>
                  Add
                  <Plus />
                </Button>
                {/* <div className="flex items-center">
                    <Minus className="h-7 w-7 p-2" />

                    <p className="border px-3 py-1 text-sm font-medium">1</p>
                    <Plus className="h-7 w-7 p-2" />
                  </div> */}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
