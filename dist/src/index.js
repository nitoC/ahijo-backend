"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const login_js_1 = __importDefault(require("./routes/login.js"));
const register_js_1 = __importDefault(require("./routes/register.js"));
const products_js_1 = __importDefault(require("./routes/products.js"));
const path_1 = __importDefault(require("path"));
const index_js_1 = __importDefault(require("./models/index.js"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
//@ts-ignore
const swaggerOptions_json_1 = __importDefault(require("../../swaggerOptions.json"));
// Initialize the express app
const app = (0, express_1.default)();
// Load environment variables from .env file
dotenv_1.default.config();
// Set the port
const port = process.env.PORT || 5000;
// Use middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
// Set the views directory and view engine
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "pug");
// Define routes
app.get("/", (req, res) => {
    res.render("admin");
});
app.get("/admin", (req, res) => {
    res.render("dashboard");
});
app.use("/api", login_js_1.default);
app.use("/api", register_js_1.default);
app.use("/api", products_js_1.default);
const specs = (0, swagger_jsdoc_1.default)(swaggerOptions_json_1.default);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
// Sync the database and start the server
//@ts-ignore
index_js_1.default.sequelize.default.sync({ alter: true }).then(() => {
    app.listen(port, () => {
        console.log(`App is running on port ${port}`);
    });
});
