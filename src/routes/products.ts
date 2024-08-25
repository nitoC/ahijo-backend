import { Router } from "express";
import uploader from "../config/upload.js";
import {
  addProductItem,
  deleteProductItem,
  getAllProductItemByCategory,
  getAllProductItemBySex,
  getAllProductItemByTag,
  getProductItem,
  getAllProductItemByName as searchController,
} from "../controllers/products";

const router = Router();
/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Add a new product
 *     description: Adds a new product to the inventory
 *     tags:
 *       - Product
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 example: "Product Name"
 *               description:
 *                 type: string
 *                 minLength: 2
 *                 example: "Product Description"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 19.99
 *               category:
 *                 type: string
 *                 minLength: 2
 *                 example: "Category"
 *               sex:
 *                 type: string
 *                 nullable: true
 *                 example: "male,female"
 *               stock:
 *                 type: number
 *                 format: int32
 *                 example: 100
 *               sizes:
 *                 type: string
 *                 example: "S,M,L,XL"
 *               tags:
 *                 type: string
 *                 nullable: true
 *                 example: "top deal,new arrival"
 *               image:
 *                 type: string
 *                 format: binary
 *               top_image:
 *                 type: string
 *                 format: binary
 *               right_image:
 *                 type: string
 *                 format: binary
 *               left_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     name:
 *                       type: string
 *                       example: "Product Name"
 *                     description:
 *                       type: string
 *                       example: "Product Description"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 19.99
 *                     category:
 *                       type: string
 *                       example: "Category"
 *                     stock:
 *                       type: number
 *                       format: int32
 *                       example: 100
 *                     sex:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["male", "female"]
 *                     sizes:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["S", "M", "L", "XL"]
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["top deal", "new arrival"]
 *                     image:
 *                       type: string
 *                       example: "image_url"
 *                     top_image:
 *                       type: string
 *                       example: "top_image_url"
 *                     right_image:
 *                       type: string
 *                       example: "right_image_url"
 *                     left_image:
 *                       type: string
 *                       example: "left_image_url"
 *       400:
 *         description: Invalid request. Empty or invalid fields submitted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request. You submitted an empty or invalid field"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       path:
 *                         type: string
 *                         example: "name"
 *                       message:
 *                         type: string
 *                         example: "String must contain at least 2 character(s)"
 *                 status:
 *                   type: integer
 *                   example: 400
 *       500:
 *         description: Server error. Product could not be added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Oops! An error occurred. Your product could not be added"
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.post(
  "/product",
  uploader.fields([
    { name: "image", maxCount: 1 },
    { name: "top_image", maxCount: 1 },
    { name: "right_image", maxCount: 1 },
    { name: "left_image", maxCount: 1 },
  ]),
  addProductItem
);

/**
 * @swagger
 * /api/product/{item_id}:
 *   get:
 *     summary: Get product details by item ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: item_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: Details of the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     category:
 *                       type: string
 *                     stock:
 *                       type: number
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Oops! an error occurred"
 *                 status:
 *                   type: number
 *                   example: 500
 */

router.get("/product/:item_id", getProductItem);
/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all products by category
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: The category of the products
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           example: 0
 *         required: true
 *         description: The number of items to skip before starting to collect the result set
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         required: true
 *         description: The number of items to return
 *     responses:
 *       200:
 *         description: A list of products by category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: array
 *
 */
router.get("/product", getAllProductItemByCategory);
/**
 * @swagger
 * /api/product/sex:
 *   get:
 *     summary: Get all products by sex
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: The category of the products
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           example: 0
 *         required: true
 *         description: The number of items to skip before starting to collect the result set
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         required: true
 *         description: The number of items to return
 *     responses:
 *       200:
 *         description: A list of products by category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: array
 *
 */
router.get("/product/sex", getAllProductItemBySex);

/**
 * @swagger
 * /api/product/tag:
 *   get:
 *     summary: Get all products by tag
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: The category of the products
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           example: 0
 *         required: true
 *         description: The number of items to skip before starting to collect the result set
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         required: true
 *         description: The number of items to return
 *     responses:
 *       200:
 *         description: A list of products by category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: array
 *
 */
router.get("/product/tag", getAllProductItemByTag);

/**
 * @swagger
 * /api/product/{item_id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to delete
 *     responses:
 *       204:
 *         description: Product successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 status:
 *                   type: number
 *                   example: 204
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: oops! an error occurred
 *                 status:
 *                   type: number
 *                   example: 500
 */

router.get("/product/:id", deleteProductItem);

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search for products by name
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name to search for
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The number of items to skip before starting to collect the result set
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The number of items to return
 *     responses:
 *       200:
 *         description: A list of matching products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The product ID
 *                   name:
 *                     type: string
 *                     description: The name of the product
 *                   description:
 *                     type: string
 *                     description: The description of the product
 *                   price:
 *                     type: number
 *                     format: float
 *                     description: The price of the product
 *       400:
 *         description: Missing or invalid query parameter
 *       500:
 *         description: An error occurred while searching for products
 */

router.get("/search", searchController);

export default router;
