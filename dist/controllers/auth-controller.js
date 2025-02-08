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
const User_1 = __importDefault(require("../models/User"));
const express_validator_1 = require("express-validator");
const request_validation_error_1 = require("../errors/request-validation-error");
const existing_user_error_1 = require("../errors/existing-user-error");
const not_found_error_1 = require("../errors/not-found-error");
const incorrect_password_error_1 = require("../errors/incorrect-password-error");
const signupController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new request_validation_error_1.RequestValidationError(errors.array()));
    }
    const body = req.body;
    try {
        const { name, email, password } = body;
        const existingUser = User_1.default.getByEmail(body.email);
        if (existingUser) {
            throw new existing_user_error_1.ExistingUserError();
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const user = new User_1.default(name, email, hashedPassword);
        user.save();
        res.status(200).json({ message: "User created", userId: user.user_id });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.signupController = signupController;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new request_validation_error_1.RequestValidationError(errors.array()));
    }
    const body = req.body;
    try {
        const { email, password } = body;
        const user = User_1.default.getByEmail(email);
        if (!user) {
            throw new not_found_error_1.NotFoundError();
        }
        const isEqual = yield bcryptjs_1.default.compare(password, user.password);
        if (!isEqual) {
            throw new incorrect_password_error_1.IncorrectPasswordError();
        }
        const token = jsonwebtoken_1.default.sign({ email: user.email, userId: user.user_id }, "supersecretkey", {
            expiresIn: "1h",
        });
        res.status(200).json({ token: token, userId: user.user_id });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.loginController = loginController;
