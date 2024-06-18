"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_js_1 = __importDefault(require("../config/upload.js"));
const products_1 = require("../controllers/products");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */
/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - stock
 *               - image
 *               - top_image
 *               - right_image
 *               - left_image
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *               description:
 *                 type: string
 *                 description: The description of the product
 *               price:
 *                 type: number
 *                 description: The price of the product
 *               category:
 *                 type: string
 *                 description: The category of the product
 *               stock:
 *                 type: number
 *                 description: The stock level of the product
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Main image of the product
 *               top_image:
 *                 type: string
 *                 format: binary
 *                 description: Top view image of the product
 *               right_image:
 *                 type: string
 *                 format: binary
 *                 description: Right view image of the product
 *               left_image:
 *                 type: string
 *                 format: binary
 *                 description: Left view image of the product
 *     responses:
 *       201:
 *         description: The created product.
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
 *                   example: 201
 *                 data:
 *                   type: object
 *                   nullable: true
 *       500:
 *         description: Some server error
 */
router.post("/product", upload_js_1.default.fields([
    { name: "image", maxCount: 1 },
    { name: "top_image", maxCount: 1 },
    { name: "right_image", maxCount: 1 },
    { name: "left_image", maxCount: 1 },
]), products_1.addProductItem);
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
router.get("/product/:id", products_1.getProductItem);
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
router.get("/product", products_1.getAllProductItemByCategory);
exports.default = router;
