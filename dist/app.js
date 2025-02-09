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
const error_handler_1 = require("./middleware/error-handler");
const app = (0, express_1.default)();
(0, db_1.create_db)();
app.use(express_1.default.json());
// app.use(bodyParser.json());
app.use(shop_1.default);
app.use("/admin", admin_1.default);
app.use("/auth", auth_1.default);
app.use(error_handler_1.errorHandler);
app.listen(3000, () => {
    console.log("Listening on 3000");
});
