const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

export const generateTokenUser = async ({ data }: { data: string }) => {
  return await jwt.sign(data, process.env.JWT_SECRET_USER, {
    expiresIn: "24h",
  });
};
export const generateRefreshToken = async ({ data }: { data: string }) => {
  return await jwt.sign(data, process.env.JWT_SECRET_USER, {
    expiresIn: "48h",
  });
};
export const generateTokenAdmin = async ({ data }: { data: string }) => {
  return await jwt.sign(data, process.env.JWT_SECRET_ADMIN, {
    expiresIn: "24min",
  });
};
export const verifyTokenUser = async ({ token }: { token: string }) => {
  return await jwt.verify(token, process.env.JWT_SECRET_ADMIN);
};
export const verifyTokenAdmin = async ({ token }: { token: string }) => {
  return await jwt.verify(token, process.env.JWT_SECRET_ADMIN);
};
