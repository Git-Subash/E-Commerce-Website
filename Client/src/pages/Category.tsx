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

import AddCategory from "@/components/AddCategory";
import GenericTable from "@/components/GenericTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SummaryApi } from "@/constants/SummaryApi";
import Axios from "@/lib/Axios";
import { setCategory } from "@/store/ProductSlice";
import { RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
  { header: "Category", key: "category" },
  {
    header: "Status",
    key: "status",
    render: (value: boolean) => (
      <Badge
        className={`rounded-sm p-1 px-1.5 text-xs ${
          value === true
            ? "bg-green-500/50 text-green-900 hover:bg-green-500/50"
            : "hover:bg-red-500/ 50 bg-red-500/50 text-red-950"
        }`}
      >
        {value === true ? "Actice" : "Disable"}
      </Badge>
    ),
  },
  { header: "Created At", key: "createdAt" },
];
const statusTypes = [
  { label: "Active", value: "active" },
  { label: "Disabled", value: "disabled" },
  { label: "Status", value: "all" },
] as const;

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

export default function Category() {
  const location = useLocation();

  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("");

  const categoryList = useSelector(
    (state: RootState) => state.product.categoryList,
  );

  // Use categoryList directly for productsData mapping
  const productsData = Array.isArray(categoryList)
    ? categoryList.map((category: any) => ({
        id: category._id || "N/A",
        image: category.image || "default.jpg",
        category: category.name || "Unnamed",
        status: category.status ?? false,
        createdAt: new Date().toISOString().split("T")[0],
      }))
    : [];
  const [filteredData, setFilteredData] = React.useState(productsData);

  React.useEffect(() => {
    filterCatergory();
  }, [search, status]);

  const filterCatergory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.filter_Category,
        params: {
          search: search || "", // Ensure this is a valid string
          status:
            status === "active"
              ? true
              : status === "disabled"
                ? false
                : undefined, // Boolean or empty
        },
      });

      if (response.data) {
        // Update Redux state and filtered data
        dispatch(setCategory(response.data.data));
        setFilteredData(
          response.data.data.map((category: any) => ({
            id: category._id || "N/A",
            image: category.image || "default.jpg",
            category: category.name || "Unnamed",
            status: category.status ?? false,
            createdAt: new Date(category.createdAt).toISOString().split("T")[0], // Use actual date
          })),
        );
      }
    } catch (error) {}
  };
  React.useEffect(() => {
    setFilteredData(productsData);
  }, [productsData]);

  let isAddCategory =
    location.pathname == "/dashboard-page/category/add-category";

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap items-center justify-between gap-y-4 pb-10 pt-10 md:pb-10 md:pt-0">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-3xl font-semibold">
            {!isAddCategory ? "Category" : "Add New Category"}
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
                  href="/dashboard-page/category"
                  className="font-medium"
                >
                  Category
                </BreadcrumbLink>
              </BreadcrumbItem>
              {isAddCategory && (
                <>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink>Add Category</BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {!isAddCategory ? (
          <Link
            to="/dashboard-page/category/add-category"
            className="group flex h-10 items-center gap-2 rounded-md border-2 border-transparent bg-primary px-4 py-2 text-sm font-bold text-white transition-all duration-200 hover:border-primary/50 hover:bg-white hover:text-black"
          >
            Add Category
            <Plus className="p-1 transition-all duration-300 group-hover:rotate-180" />
          </Link>
        ) : (
          <Link
            to="/dashboard-page/category"
            className="flex h-10 items-center gap-2 rounded-md border-2 border-transparent bg-secondary px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:border-secondary hover:bg-white hover:text-black"
          >
            Back
          </Link>
        )}
      </div>
      {isAddCategory ? (
        <AddCategory />
      ) : (
        // <div>subas</div>
        <Card className="my-10">
          <CardHeader className="w-full items-center justify-between gap-2 sm:flex-row">
            <Input
              placeholder="search"
              className="w-full sm:w-[300px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select
              onValueChange={(value) => setStatus(value)} // Update status on selection
            >
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusTypes.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="min-w-full max-w-sm whitespace-nowrap sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-xl">
              {filteredData.length > 0 ? (
                <GenericTable
                  columns={columns}
                  data={filteredData}
                  actions={actions}
                />
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No categories found.
                </div>
              )}
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
