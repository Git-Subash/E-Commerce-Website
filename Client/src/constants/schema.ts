import { z } from "zod";

export const ProductSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." }),
  image: z.array(z.string().url()).optional(),

  categoryId: z.string().nonempty({ message: "Category ID is required." }),
  sub_categoryId: z
    .string()
    .nonempty({ message: "Sub-category ID is required." }),
  unit: z.string().min(1, { message: "Unit must be provided." }),

  stock: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Stock must be a valid number." }),

  status: z.boolean(),

  price: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Price must be a valid number." }),

  salePrice: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Sale price must be a valid number.",
    }),

  discount: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Discount must be a valid number.",
    }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." }),
  role: z.union([z.literal("edit"), z.literal("add")]),
});

export const categorySchema = z.object({
  name: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  status: z.boolean(),
  image: z.string().url().optional(),
  role: z.union([z.literal("edit"), z.literal("add")]),
});

export const subCategorySchema = z.object({
  name: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  role: z.union([z.literal("edit"), z.literal("add")]),
});
