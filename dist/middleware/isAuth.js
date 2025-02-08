"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const unauthorized_error_1 = require("../errors/unauthorized-error");
const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        throw new unauthorized_error_1.UnauthorizedError();
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        throw new unauthorized_error_1.UnauthorizedError();
    }
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, "supersecretkey");
    }
    catch (err) {
        throw err;
    }
    if (!decodedToken) {
        throw new unauthorized_error_1.UnauthorizedError();
    }
    req.userId = decodedToken.userId;
    next();
};
exports.isAuth = isAuth;
