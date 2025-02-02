"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./data/db");
const shop_1 = __importDefault(require("./routes/shop"));
const admin_1 = __importDefault(require("./routes/admin"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
(0, db_1.create_db)();
app.use(express_1.default.json());
// app.use(bodyParser.json());
app.use(shop_1.default);
app.use(admin_1.default);
app.use("/auth", auth_1.default);
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.status || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});
app.listen(3000);
