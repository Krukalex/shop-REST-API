"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.signupController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dummyData_1 = require("../data/dummyData");
const User_1 = __importDefault(require("../models/User"));
const signupController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (!body.email && !body.name && !body.password) {
        const error = new Error("Missing required fields in request");
        error.status = 400;
        return error;
    }
    try {
        const { name, email, password } = body;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const user = new User_1.default(name, email, hashedPassword);
        user.save();
        res.status(200).json({ message: "User created", userId: user.id });
    }
    catch (err) {
        if (!err.status) {
            err.status = 500;
        }
        next(err);
    }
});
exports.signupController = signupController;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (!body.email && !body.password) {
        const error = new Error("Missing required fields in request");
        error.status = 400;
        return error;
    }
    try {
        const { email, password } = body;
        const user = dummyData_1.users.find((user) => user.email === email);
        if (!user) {
            const error = new Error("A user with this email could not be found");
            error.status = 404;
            throw error;
        }
        const isEqual = yield bcryptjs_1.default.compare(password, user.password);
        if (!isEqual) {
            const error = new Error("Wrong password!");
            error.status = 401;
            throw error;
        }
        const token = jsonwebtoken_1.default.sign({ email: user.email, userId: user.id }, "supersecretkey", {
            expiresIn: "1h",
        });
        res.status(200).json({ token: token, userId: user.id });
    }
    catch (err) {
        if (!err.status) {
            err.status = 500;
        }
        next(err);
    }
});
exports.loginController = loginController;
