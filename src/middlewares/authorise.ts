import { Request, Response, NextFunction } from "express";

const {
  generateTokenUser,
  generateRefreshToken,
  verifyTokenUser,
} = require("../helpers/jwt.js");
interface RequestNew extends Request {
  user?: { id: string };
}
export const authorize = async (
  req: RequestNew,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ message: "You are not authorized to access this resource" });
  }
  if (token.startsWith("bearer")) {
    const decoded = await verifyTokenUser({ token: token.split(" ")[1] });
    try {
      if (!decoded) {
        return res
          .status(401)
          .json({ message: "You are not authorized to access this resource" });
      }
      req.user = decoded;

      next();
    } catch (err) {
      return res
        .status(401)
        .json({ message: "You are not authorized to access this resource" });
    }
  }
};
