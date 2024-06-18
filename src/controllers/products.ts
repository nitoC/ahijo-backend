import { Request, Response } from "express";
// import { File } from "multer";
import {
  addProduct,
  getAllProductByCategory,
  getProduct,
  deleteProduct,
  getAllProductBySex,
} from "../repositories/Product.js";
// import product from "../models/Product.js";
import { uploadFile } from "../config/cloudinary.js";

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

export const addProductItem = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    let filesArray = [];

    for (let file in files) {
      filesArray.push([files[file], file]);
    }

    let data: any = {
      name,
      description,
      price,
      category,
      stock,
      image: "",
      top_image: "",
      right_image: "",
      left_image: "",
    };

    // console.log(filesArray, "files");
    // console.log(typeof files, "files");
    const productItem = filesArray?.map(async (file) => {
      console.log("uploading");
      const secure_url = await uploadFile(
        file[0][0],
        //@ts-ignore
        name,
        file[1] as string
      );
      console.log(secure_url, "secure url");
      const index = file[1] as string;
      console.log(index, "index");
      console.log(file, "index");
      data[index] = secure_url;
      console.log("upload finished");
    });
    await Promise.all(productItem);
    const item = await addProduct(data);
    console.log(item, "files");
    console.log(typeof item, "files");
    return res.json({ message: "success", status: 201, data: null });
  } catch (error) {
    console.log(error, "add product error");
    res.json({ message: "oops! an error occured", status: 500 });
  }
};

export const getProductItem = async (req: Request, res: Response) => {
  try {
    const { item_id } = req.params;

    const item = await getProduct({ item_id });
    return res.json({ message: "success", status: 200, data: item });
  } catch (error) {
    console.log(error, "get product error");
    res.json({ message: "Oops! an error occured", status: 500 });
  }
};
export const getAllProductItemByCategory = async (
  req: Request,
  res: Response
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
