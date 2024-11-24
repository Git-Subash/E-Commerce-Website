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

import AddSubCategory from "@/components/AddSubCategory";
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
import { setSubCtegory } from "@/store/ProductSlice";
import { RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const columns = [
  { header: "Sub_Category", key: "subcategory" },
  { header: "Category", key: "category" },

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

export default function SubCategory() {
  const location = useLocation();
  let isAddCategory =
    location.pathname == "/dashboard-page/sub-category/add-sub-category";
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const SubcategoryList = useSelector(
    (state: RootState) => state.product.subcategoryList,
  );

  const categoryList = useSelector(
    (state: RootState) => state.product.categoryList,
  );

  // Create a lookup map for categories
  const categoryLookup = Array.isArray(categoryList)
    ? new Map(
        categoryList.map((category: any) => [category._id, category.name]),
      )
    : new Map();

  // Use SubcategoryList directly for productsData mapping
  const productsData = Array.isArray(SubcategoryList)
    ? SubcategoryList.map((subcategory: any) => ({
        id: subcategory._id || "N/A",
        subcategory: subcategory.name || "Unnamed Subcategory",
        category:
          categoryLookup.get(subcategory.categoryId) || "Unknown Category",
        createdAt: new Date().toISOString().split("T")[0],
      }))
    : [];
  const [filteredData, setFilteredData] = React.useState(productsData);

  //seting the values for the select
  const categoryTypes = Array.isArray(categoryList)
    ? categoryList.map((category: any) => ({
        value: category._id || "N/A",
        label: category.name || "N/A",
      }))
    : [];

  async function fetchFilteresSubCategory() {
    try {
      const response = await Axios({
        ...SummaryApi.filter_SubCategory,
        params: {
          search,
          category: selectedCategory,
        },
      });

      if (response.data.data) {
        dispatch(setSubCtegory(response.data.data));
        setFilteredData(
          response.data.data.map((subcategory: any) => ({
            id: subcategory._id || "N/A",
            subcategory: subcategory.name || "Unnamed Subcategory",
            category:
              categoryLookup.get(subcategory.categoryId) || "Unknown Category",
            createdAt: new Date().toISOString().split("T")[0],
          })),
        );
      }
    } catch (error) {}
  }

  React.useEffect(() => {
    setFilteredData(productsData);
  }, [productsData]);

  React.useEffect(() => {
    fetchFilteresSubCategory();
  }, [search, selectedCategory]);

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap items-center justify-between gap-y-4 pb-10 pt-10 md:pb-10 md:pt-0">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-3xl font-semibold">
            {!isAddCategory ? "Sub-Category" : "Add New Sub-Category"}
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
                  href="/dashboard-page/sub-category"
                  className="font-medium"
                >
                  Sub-Category
                </BreadcrumbLink>
              </BreadcrumbItem>
              {isAddCategory && (
                <>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink>Add Sub-Category</BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {!isAddCategory ? (
          <Link
            to="/dashboard-page/sub-category/add-sub-category"
            className="group flex h-10 items-center gap-2 rounded-md border-2 border-transparent bg-primary px-4 py-2 text-sm font-bold text-white transition-all duration-200 hover:border-primary/50 hover:bg-white hover:text-black"
          >
            Add Sub_Category
            <Plus className="p-1 transition-all duration-300 group-hover:rotate-180" />
          </Link>
        ) : (
          <Link
            to="/dashboard-page/sub-category"
            className="flex h-10 items-center gap-2 rounded-md border-2 border-transparent bg-secondary px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:border-secondary hover:bg-white hover:text-black"
          >
            Back
          </Link>
        )}
      </div>
      {isAddCategory ? (
        <AddSubCategory />
      ) : (
        <Card className="my-10">
          <CardHeader className="w-full items-center justify-between gap-2 sm:flex-row">
            <Input
              placeholder="search"
              className="w-full sm:w-[300px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select
              onValueChange={(value) => setSelectedCategory(value)}
              defaultValue={selectedCategory}
            >
              <SelectTrigger className="w-full sm:w-[300px]">
                <SelectValue placeholder="Product Category" />
              </SelectTrigger>
              <SelectContent className="">
                {categoryTypes.map((item) => (
                  <SelectItem value={item.value}>{item.label}</SelectItem>
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
