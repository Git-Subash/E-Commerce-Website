import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Card } from "./ui/card";

const list = [
  { name: " Dairy, Bread & Eggs", to: "/", image: "/category-1.jpg" },
  { name: "Snacks & Munchies", to: "/", image: "/category-2.jpg" },
  { name: "Fruits & Vegetables", to: "/", image: "/category-7.jpg" },
  { name: "  Cold Drinks & Juices", to: "/", image: "/category-6.jpg" },
  { name: " Breakfast & Instant Food", to: "/", image: "/category-5.jpg" },
  { name: "Bakery & Biscuits", to: "/", image: "/category-3.jpg" },
  { name: " Chicken, Meat & Fish", to: "/", image: "/category-8.jpg" },
];

export default function CategoriesSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  const [api, setApi] = React.useState<CarouselApi>();

  // Handle navigation for the arrows
  const handleRightClick = () => {
    if (api?.canScrollNext()) {
      api.scrollNext();
    }
  };

  const handleLeftClick = () => {
    if (api?.canScrollPrev()) {
      api.scrollPrev();
    }
  };

  return (
    <MaxWidthWrapper className="my-10 flex flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-bold">Featured Categories</h1>
        <div className="flex gap-3 md:mt-2">
          <ArrowLeft
            onClick={handleLeftClick}
            className="h-10 w-10 rounded-full bg-primary/20 p-2"
          />
          <ArrowRight
            onClick={handleRightClick}
            className="h-10 w-10 rounded-full bg-primary/20 p-2"
          />
        </div>
      </div>

      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {list.map((_item, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <Link to={_item.to} className=" ">
                <Card className="mt-6 flex flex-col items-center justify-center gap-6 p-4">
                  <img src={_item.image} className="mx-auto h-32 w-32" />
                  <p>{_item.name}</p>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </MaxWidthWrapper>
  );
}
