import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import login from "./routes/login.js";
import register from "./routes/register.js";
import product from "./routes/products.js";
import cart from "./routes/cart.js";

import path from "path";
import db from "./models/index.js";
import swaggerExpress from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
//@ts-ignore
import options from "../../swaggerOptions.json";
import { BaseErrorInstance } from "./errors/customErrors.js";

// Initialize the express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Set the port
const port = process.env.PORT || 5000;

// Use middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set the views directory and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Define routes
app.get("/", (req: Request, res: Response) => {
  res.render("admin");
});
app.get("/admin", (req: Request, res: Response) => {
  res.render("dashboard");
});

app.use("/api", login);
app.use("/api", register);
app.use("/api", product);
app.use("/api", cart);

const specs = swaggerDoc(options);
app.use("/api-docs", swaggerExpress.serve, swaggerExpress.setup(specs));

app.use(
  (
    err: BaseErrorInstance | Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err instanceof BaseErrorInstance) {
      res.status(err.status as number).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Sync the database and start the server
//@ts-ignore
db.sequelize.default.sync().then(() => {
  app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });
});
