import { NextFunction, Request, Response } from "express";
import { z } from "zod";
// import { File } from "multer";
import {
  addProduct,
  getAllProductByCategory,
  getProduct,
  deleteProduct,
  getAllProductBySex,
  getAllProductByTag,
  getAllProductByName,
} from "../repositories/Product.js";
// import product from "../models/Product.js";
import { uploadFile } from "../config/cloudinary.js";
import { BadRequestError } from "../errors/customErrors.js";

// // Define the type for the uploaded files
// interface MulterFile {
//   path: string;
//   fieldname: string;
//   originalname: string;
//   encoding: string;
//   mimetype: string;
//   size: number;
//   destination: string;
//   filename: string;
//   buffer?: Buffer;
// }

// // Extend the Request type to include Multer's files property
// interface CustomRequest extends Request {
//   files: { [fieldname: string]: File[] } | File[] | undefined;
// }

export const addProductItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productValidate = z.object({
      name: z.string().min(2),
      description: z.string().min(2),
      price: z.number().positive(),
      category: z.string().min(2),
      sex: z.string().nullable(),
      stock: z.number().positive(),
      sizes: z.string(),
      tags: z.string().nullable().optional(),
    });

    const { name, description, price, category, stock, sex, sizes, tags } =
      req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const productValid = productValidate.safeParse({
      name,
      description,
      price: parseInt(price),
      category,
      sex,
      stock: parseInt(stock),
      sizes,
      tags,
    });

    if (!productValid.success) {
      throw new BadRequestError(
        "Invalid request. you submitted an empty or invalid field"
      );
    }

    const filesArray = Object.entries(files).map(([fieldname, file]) => ({
      file: file[0],
      fieldname,
    }));

    let data: any = {
      name,
      description,
      price: parseInt(price),
      category,
      stock: parseInt(stock),
      sex,
      tags: tags.split(","),
      sizes: sizes.split(","),
      image: "",
      top_image: "",
      right_image: "",
      left_image: "",
    };

    const productItemPromises = filesArray.map(async ({ file, fieldname }) => {
      try {
        const secure_url = await uploadFile(file, name, fieldname);
        data[fieldname] = secure_url;
      } catch (error) {
        console.log(`Failed to upload ${fieldname}`, error);
        throw new Error("Oops! failed to upload file to storage");
      }
    });

    await Promise.all(productItemPromises);

    const item = await addProduct(data);
    console.log(item, "Product added");

    return res
      .status(201)
      .json({ message: "Success", status: 201, data: item });
  } catch (err) {
    console.log("Add product error:", err);
    next(err);
  }
};

export const getProductItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const zodSchema = z.string();
    const { item_id } = req.params;
    console.log(item_id, "item id");
    console.log(req.params, "params");

    const itemValid = zodSchema.safeParse(item_id);

    if (!itemValid.success) throw new BadRequestError("Invalid item id");

    const item = await getProduct({ item_id });
    return res.json({ message: "success", status: 200, data: item });
  } catch (err) {
    console.log(err, "get product error");
    next(err);
  }
};
export const getAllProductItemByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const factor = 18;
  try {
    const { category, offset, limit } = req.query;

    let offsetVal: number = parseInt(offset as string);
    let limitVal: number = parseInt(limit as string);
    let categoryVal: string = <string>category;

    const item = await getAllProductByCategory({
      category: categoryVal,
      offsetVal,
      limitVal,
    });
    return res.json({ message: "success", status: 200, data: item });
  } catch (error) {
    console.log(error, "get product error");
  }
};
export const getAllProductItemByName = async (req: Request, res: Response) => {
  const factor = 18;
  try {
    const { name, offset, limit } = req.query;
    console.log(req.query, "query log");

    console.log(name, "get product by name");
    let offsetVal: number = parseInt(offset as string);
    let limitVal: number = parseInt(limit as string);
    let nameVal: string = <string>name;

    console.log(name, "name");

    const item = await getAllProductByName({
      name: nameVal,
      offsetVal,
      limitVal,
    });
    return res.json({ message: "success", status: 200, data: item });
  } catch (error) {
    console.log(error, "get product error");
  }
};
export const getAllProductItemByTag = async (req: Request, res: Response) => {
  const factor = 18;
  try {
    const { tag, offset, limit } = req.query;

    let offsetVal: number = parseInt(offset as string);
    let limitVal: number = parseInt(limit as string);
    let tagVal: string = <string>tag;

    const item = await getAllProductByTag({
      tag: tagVal,
      offsetVal,
      limitVal,
    });
    return res
      .status(200)
      .json({ message: "success", status: 200, data: item });
  } catch (error) {
    console.log(error, "get product error");
    res.status(500).json({ message: "couldn't fetch products" });
  }
};

export const getAllProductItemBySex = async (req: Request, res: Response) => {
  const factor = 18;
  try {
    const { sex, offset, limit } = req.params;

    let offsetVal: number = parseInt(offset);
    let limitVal: number = parseInt(limit);

    const item = await getAllProductBySex({ sex, offsetVal, limitVal });

    return res.json({ message: "success", status: 200, data: item });
  } catch (error) {
    console.log(error, "get product error");
    res.json({ message: "oops! an error occured", status: 500 });
  }
};
export const deleteProductItem = async (req: Request, res: Response) => {
  try {
    const { item_id } = req.params;

    const item = await deleteProduct(item_id);
    return res.json({ message: "success", status: 204 });
  } catch (error) {
    console.log(error, "delete product error");
    res.json({ message: "oops! an error occurred", status: 500 });
  }
};
