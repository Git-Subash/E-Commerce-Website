import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { Dot, MoveRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { Badge } from "./ui/badge";

const list = [
  {
    to: "/",
    image: "/slide-1.jpg",
    tag: "Fresh & Organic - Direct from Farms",
    title: "Discover the Freshest Produce Today",
    discription:
      "Stock up on fresh fruits and vegetables, sourced daily to ensure quality and taste. Perfect for healthy living!",
  },
  {
    to: "/",
    image: "/slide-2.jpg",
    tag: "Weekly Deals - Up to 20% Off",
    title: "Dairy, Bread, and Eggs Delivered Fresh",
    discription:
      "From farm-fresh milk to artisanal bread, find everything you need to start your day on the right note.",
  },
];

export default function HeroSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    // Set total slide count and listen for slide changes
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index); // Navigate to the respective slide
    }
  };
  return (
    <MaxWidthWrapper className="">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full "
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}>
        <CarouselContent>
          {list.map((_item, index) => (
            <CarouselItem key={index}>
              <div
                className=" h-[40vh] relative  sm:h-[60vh] mt-14 rounded-md bg-cover bg-center bg-no-repeat "
                style={{ backgroundImage: `url(${_item.image})` }}>
                <div className="w-full px-5 md:px-14  flex flex-col justify-center gap-y-4 sm:gap-y-8 h-full">
                  <Badge
                    className=" bg-amber-600  mr-auto pb-1.5 px-2 "
                    variant="outline">
                    {_item.tag}
                  </Badge>
                  <h1 className="text-2xl sm:text-5xl font-bold max-w-2xl">
                    {_item.title}{" "}
                  </h1>
                  <p className="text-sm text-secondary/60 max-w-md sm:text-lg">
                    {_item.discription}{" "}
                  </p>
                  <Link
                    className={cn(
                      "flex  group gap-2 items-center mr-auto  transition-all duration-300 ",
                      buttonVariants({ variant: "secondary" })
                    )}
                    to={_item.to}>
                    Show Now{" "}
                    <MoveRight className="group-hover:translate-x-2 transition-all duration-300" />
                  </Link>
                </div>
                <div className="flex z-30 absolute bottom-0 w-full justify-center ">
                  {Array.from({ length: count }).map((_, index) => (
                    <Dot
                      key={index}
                      className={cn(
                        "cursor-pointer h-12  w-12  transition-colors",
                        current == index ? "text-primary" : "text-gray-400"
                      )}
                      onClick={() => handleDotClick(index)}
                    />
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </MaxWidthWrapper>
  );
}
