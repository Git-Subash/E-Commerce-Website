import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DollarSign, Plus, ShoppingCartIcon, UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { buttonVariants } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    productName: "Milk",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    productName: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    productName: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    productName: "Credit Card",
  },
];

const list = [
  {
    to: "/dashboard-page/products",
    image: "/dash-image.jpg",

    title: "Welcome To Shopme Dashboard!",
    discription: "Shopme is simple & clean design for developer and designer",
  },
];

const list2 = [
  {
    title: "Earnings",
    number: "$93,438.78",
    discription: "Monthly revenue",
    icon: <DollarSign className="bg-primary/20 w-10 p-2 rounded-full h-10" />,
  },
  {
    title: "Orders",
    number: "93,438",
    discription: "32+New Sales",
    icon: (
      <ShoppingCartIcon className="bg-orange-500/20 w-10 p-2 rounded-full h-10" />
    ),
  },
  {
    title: "Customer",
    number: "53,438",
    discription: "30+new in 2 days",
    icon: <UsersIcon className="bg-sky-500/20 w-10 p-2 rounded-full h-10" />,
  },
];
export default function DashboardPage() {
  return (
    <section className="mt-10 px-5  ">
      {list.map((_item, _index) => (
        <div
          key={_index}
          className=" h-[25vh] relative  sm:h-[30vh]  rounded-lg bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: `url(${_item.image})` }}>
          <div className="w-full px-5 md:px-14  flex flex-col justify-center gap-y-3 sm:gap-y-6 h-full">
            <h1 className="text-2xl sm:text-4xl font-semibold max-w-2xl">
              {_item.title}
            </h1>
            <p className="text-sm text-secondary/60 font-medium max-w-xs md:max-w-md sm:text-lg">
              {_item.discription}{" "}
            </p>
            <Link
              className={cn(
                "flex  group gap-2 items-center mr-auto  transition-all duration-300 ",
                buttonVariants({ variant: "default" })
              )}
              to={_item.to}>
              Create Product
              <Plus className="group-hover:rotate-180 transition-all duration-300" />
            </Link>
          </div>
        </div>
      ))}
      <ScrollArea className=" max-w-md  min-w-full xl:max-w-7xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl  whitespace-nowrap ">
        <div className="flex w-max space-x-4 p-4">
          {list2.map((_item, _index) => (
            <Card className="mt-5  min-w-[400px] border-none  rounded-lg shadow-md">
              <CardContent className="p-6 flex flex-col gap-10">
                <CardTitle className="flex  justify-between items-center">
                  {_item.title}
                  {_item.icon}
                </CardTitle>
                <div className="flex flex-col">
                  <h2 className="text-3xl font-bold">{_item.number}</h2>
                  <p>{_item.discription}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Card className="my-10">
        <CardHeader>
          <CardTitle> Recent Orders </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/10 hover:bg-secondary/0  w-full">
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-secondary  cursor-pointer">
                      {invoice.paymentStatus}{" "}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.productName}</TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/*  */}
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
