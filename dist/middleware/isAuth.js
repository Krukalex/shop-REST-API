"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new Error("Not authenticated");
        error.status = 401;
        throw error;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        const error = new Error("Not authenticated");
        error.status = 401;
        throw error;
    }
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, "supersecretkey");
    }
    catch (err) {
        throw err;
    }
    if (!decodedToken) {
        const error = new Error("Not authenticated");
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};
exports.isAuth = isAuth;
