const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyparser = require("body-parser");
const login = require("./routes/login.js");
const register = require("./routes/register.js");
const db = require("./models/index.js");
import { Request, Response } from "express";

dotenv.config();

const port = process.env.PORT;
console.log(__dirname, "dirname");

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "welcome to ahijoe shoes" });
});
app.use("/api", login);
app.use("/api", register);

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(port || 5000, () => {
    console.log(`app is running on ${port}`);
  });
});
