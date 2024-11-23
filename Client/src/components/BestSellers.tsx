import { ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const product = [
  { name: " Dairy, Bread & Eggs", to: "/", image: "/category-1.jpg" },
  { name: "Snacks & Munchies", to: "/", image: "/category-2.jpg" },
  { name: "Fruits & Vegetables", to: "/", image: "/category-7.jpg" },
  { name: "  Cold Drinks & Juices", to: "/", image: "/category-6.jpg" },
  { name: " Breakfast & Instant Food", to: "/", image: "/category-5.jpg" },
  { name: "Bakery & Biscuits", to: "/", image: "/category-3.jpg" },
  { name: " Chicken, Meat & Fish", to: "/", image: "/category-8.jpg" },
];

export default function BestSellers() {
  return (
    <MaxWidthWrapper className="my-10 flex  flex-col gap-4">
      <div className="flex    items-center justify-between w-full">
        <h1 className="text-3xl font-bold">Best Sellers</h1>
        <Link
          to="/"
          className="flex bg-primary/20 px-4 rounded-full group items-center gap-1  md:mt-2">
          See More{" "}
          <ArrowRight className=" w-10 p-2.5 rounded-full group-hover:translate-x-2 transition-all duration-300 h-10" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4  sm:grid-cols-3 lg:grid-cols-4">
        {product.map((_item, _index) => (
          <Link to={_item.to} className="  ">
            <Card className="p-4 mt-6 ">
              <img src={_item.image} className="w-32 h-32 mx-auto" />
              <div className="mt-4">
                <h1 className="text-xs">{_item.name}</h1>
                <h1 className="text-md  font-bold">Products</h1>
              </div>
              <div className="w-full  mt-4 flex justify-between items-center ">
                <p className="flex flex-col gap-1.5">
                  $21.3 <del className="text-secondary/50">$32.53</del>
                </p>
                <Button size="sm">
                  <Plus /> Add
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
