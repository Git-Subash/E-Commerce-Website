import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { RootState } from "@/store/store";
import { ShoppingCartIcon, Trash2 } from "lucide-react";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

const cartItems = [
  {
    name: "Haldiram's Sev Bhijia dadsadsaddsad ",
    price: "$200",
    image: "/category-1.jpg",
  },
  { name: "Haldiram's Sev ", price: "$200", image: "/category-2.jpg" },
  {
    name: "Haldiram's Sev Bhijia dadsadsaddsad ",
    price: "$200",
    image: "/category-3.jpg",
  },
  {
    name: "Haldiram's Sev Bhijia dadsadsaddsad ",
    price: "$200",
    image: "/category-6.jpg",
  },
];

export default function CartDrawer({ button }: { button: ReactNode }) {
  const [quantity, setQuantity] = React.useState(1);
  const [isDrawerOpen, isSetDrawerOpen] = React.useState(false);
  const user = useSelector((state: RootState) => state.user);
  const { toast } = useToast();
  const isLoggedIn = user?._id;
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleToast = () => {
    if (!isLoggedIn) {
      toast({
        variant: "destructive",
        title: "Login to Access Cart",
        description: "We couldn't able to sign. Please try again.",
      });
    }
  };
  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={
        isLoggedIn ? (isOpen) => isSetDrawerOpen(isOpen) : undefined
      }>
      <DrawerTrigger onClick={handleToast}>{button}</DrawerTrigger>
      <DrawerContent className="h-4/5 border-none">
        <DrawerHeader className="drop-shadow-[0px_0px_20px_rgba(0,0,145,12)]"></DrawerHeader>
        <Card className="!p-0 border-none  ">
          <CardHeader className="flex justify-between mb-auto border-b">
            <CardTitle className="flex items-center justify-between   ">
              <span className="flex  items-center gap-2">
                Shopping Cart <ShoppingCartIcon />
              </span>

              <DrawerClose className="">
                <Button variant="outline" className=" rounded-lg ">
                  Continue Shopping
                </Button>
              </DrawerClose>
            </CardTitle>
            <CardDescription>Total Price: $32133</CardDescription>
          </CardHeader>

          <CardContent className="">
            <Table className="mx-auto">
              <ScrollArea className="h-[400px] w-full">
                <TableBody>
                  {cartItems.map((item, index) => (
                    <TableRow
                      key={index}
                      className=" h-32  w-full flex items-center py-10  justify-evenly ">
                      <TableCell className="table-cell">
                        <img
                          alt="Product image"
                          className=" w-20 object-cover"
                          src={item.image}
                        />
                      </TableCell>
                      <TableCell className=" font-semibold text-md flex flex-col items-start  p-0  gap-2  my-auto mr-auto h-full  justify-center   ">
                        {item.name}
                        <Button
                          variant="link"
                          className="!no-underline p-0 text-xs flex items-center text-secondary">
                          <Trash2 className="text-destructive " /> Remove
                        </Button>
                      </TableCell>

                      <TableCell className="table-cell">
                        <div className="flex items-center  ">
                          <button
                            onClick={handleDecrement}
                            className="border-l py-1 px-3   border-t border-b rounded-l-md ">
                            -
                          </button>
                          <p className="text-sm font-medium border  py-1  px-2 ">
                            {quantity}
                          </p>
                          <button
                            onClick={handleIncrement}
                            className="border-r py-1  px-3 border-t border-b rounded-r-md ">
                            +
                          </button>
                        </div>
                      </TableCell>
                      <TableCell className="table-cell font-bold">
                        {item.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </ScrollArea>
            </Table>
          </CardContent>
        </Card>

        <DrawerFooter className="flex justify-between ">
          <Link
            to={isLoggedIn ? "/cart" : "/login"}
            onClick={() => isSetDrawerOpen(false)}
            className={cn(buttonVariants({ variant: "default" }))}>
            Proceed To Checkout
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
