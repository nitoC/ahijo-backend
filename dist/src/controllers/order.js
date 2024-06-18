"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const createOrder = (req, res) => {
    try {
        const { user_id, cart_id } = req.query;
        res.json({ message: "success", status: 201 });
    }
    catch (err) {
        console.log(err);
    }
};
exports.createOrder = createOrder;
