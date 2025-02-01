"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const shop_1 = __importDefault(require("./routes/shop"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(shop_1.default);
app.listen(3000);
