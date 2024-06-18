import { Iproduct } from "../interfaces/Interfaces.js";
const product = require("../models/Product.js");

export const addProduct = async (data: Iproduct) => {
  console.log(data, "add repo");
  try {
    const item = await product.create(data);
    return item;
  } catch (error) {
    console.log(error, "add product error");
  }
};

export const getProduct = async (data: { item_id: string }) => {
  try {
    const item = await product.findByPk(data.item_id);
    console.log(item, "item");
    return item;
  } catch (error) {
    console.log(error, "get product error");
  }
};
export const getAllProductByCategory = async (data: {
  category: string;
  offsetVal: number;
  limitVal: number;
}) => {
  const factor = 18;
  try {
    const item = await product.findAll({
      where: {
        category: data.category,
      },
      limit: data.limitVal * factor,
      offset: data.offsetVal * factor,
    });
    return item;
  } catch (error) {
    console.log(error, "get product error");
  }
};

export const getAllProductBySex = async (data: {
  sex: string;
  offsetVal: number;
  limitVal: number;
}) => {
  const factor = 18;
  try {
    const item = await product.findAll({
      where: {
        sex: data.sex,
      },
      limit: data.limitVal * factor,
      offset: data.offsetVal * factor,
    });
    return item;
  } catch (error) {
    console.log(error, "get product error");
  }
};

export const deleteProduct = async (data: string) => {
  try {
    const item = await product.destroy({
      where: {
        id: data,
      },
    });
    return item;
  } catch (error) {
    console.log(error, "remove product error");
  }
};