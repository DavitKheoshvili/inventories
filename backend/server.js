"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/generate_random_data", (req, res) => {
    (0, db_1.generateData)();
    res.status(200).json({ message: "Generated" });
});
const inventories_1 = __importDefault(require("./routes/inventories"));
app.use("/inventories", inventories_1.default);
app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
