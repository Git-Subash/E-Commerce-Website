import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Ellipsis, Plus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import GenericTable from "@/components/GenericTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddProduct from "@/components/AddProduct";

const columns = [
  {
    header: "Image",
    key: "image",
    render: (value: string | undefined) => (
      <img
        src={value}
        alt="product"
        className="h-10 w-10 rounded-md object-cover"
      />
    ),
  },
  { header: "Product Name", key: "name" },
  { header: "Category", key: "category" },
  { header: "Price", key: "price" },
  {
    header: "Status",
    key: "status",
    render: (value: string) => (
      <Badge
        className={`rounded-sm p-1 ${
          value === "Active" ? "bg-green-200" : "bg-gray-300"
        }`}
      >
        {value}
      </Badge>
    ),
  },
  { header: "Created At", key: "createdAt" },
];

const actions = () => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Ellipsis className="p-1" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem>Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default function Products() {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);
  const productsData = [
    {
      id: user._id,
      image: "/slide-1.jpg",
      name: user.name,
      category: user.email,
      status: "Active",
      price: "$10",
      createdAt: new Date().toISOString().split("T")[0],
    },
  ];
  let isAddProduct =
    location.pathname == "/dashboard-page/products/add-product";

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap items-center justify-between gap-y-4 pb-10 pt-10 md:pb-10 md:pt-0">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-3xl font-semibold">
            {!isAddProduct ? "Products" : "Add New Product"}
          </h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard-page" className="font-medium">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/dashboard-page/products"
                  className="font-medium"
                >
                  Products
                </BreadcrumbLink>
              </BreadcrumbItem>
              {isAddProduct && (
                <>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink>Add Products</BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {!isAddProduct ? (
          <Link
            to="/dashboard-page/products/add-product"
            className="group flex h-10 items-center gap-2 rounded-md border-2 border-transparent bg-primary px-4 py-2 text-sm font-bold text-white transition-all duration-200 hover:border-primary/50 hover:bg-white hover:text-black"
          >
            Add Product
            <Plus className="p-1 transition-all duration-300 group-hover:rotate-180" />
          </Link>
        ) : (
          <Link
            to="/dashboard-page/products"
            className="flex h-10 items-center gap-2 rounded-md border-2 border-transparent bg-secondary px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:border-secondary hover:bg-white hover:text-black"
          >
            Back
          </Link>
        )}
      </div>
      {isAddProduct ? (
        <AddProduct />
      ) : (
        // <div>subas</div>
        <Card className="my-10">
          <CardHeader className="w-full items-center justify-between gap-2 sm:flex-row">
            <Input placeholder="subash" className="w-full sm:w-[300px]" />
            <Select>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Status</SelectItem>
                <SelectItem value="dark">Active</SelectItem>
                <SelectItem value="system">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="min-w-full max-w-sm whitespace-nowrap sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-xl">
              <GenericTable
                columns={columns}
                data={productsData}
                actions={actions}
              />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
