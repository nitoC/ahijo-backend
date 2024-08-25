"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_1 = require("../controllers/cart");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add a new item to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - quantity
 *               - user_id
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: The ID of the product to add
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product
 *               user_id:
 *                 type: string
 *                 description: The ID of the user
 *               cart_id:
 *                 type: string
 *                 description: The ID of the cart (optional)
 *     responses:
 *       201:
 *         description: Item added to cart successfully
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
 *       500:
 *         description: An error occurred
 */
router.post("/cart", cart_1.addToCart);
/**
 * @swagger
 * /api/cart/{user_id}:
 *   get:
 *     summary: Get all items in the cart for a user
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved cart items
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
 *                   items:
 *                     type: object
 *       500:
 *         description: An error occurred
 */
router.get("/cart/:user_id", cart_1.getAllCartItems);
/**
 * @swagger
 * /api/cart:
 *   put:
 *     summary: Update an item in the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - quantity
 *               - user_id
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: The ID of the product to update
 *               quantity:
 *                 type: integer
 *                 description: The new quantity of the product
 *               user_id:
 *                 type: string
 *                 description: The ID of the user
 *               cart_id:
 *                 type: string
 *                 description: The ID of the cart (optional)
 *     responses:
 *       201:
 *         description: Item updated in cart successfully
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
 *       500:
 *         description: An error occurred
 */
router.put("/cart", cart_1.updateCart);
/**
 * @swagger
 * /api/cart/{item_id}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item to remove
 *     responses:
 *       204:
 *         description: Item removed from cart successfully
 *       500:
 *         description: An error occurred
 */
router.delete("/cart/:item_id", cart_1.removeFromCart);
exports.default = router;
