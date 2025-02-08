"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncorrectPasswordError = void 0;
const custom_error_1 = require("./custom-error");
class IncorrectPasswordError extends custom_error_1.CustomError {
    constructor() {
        super("Wrong password");
        this.statusCode = 401;
        Object.setPrototypeOf(this, IncorrectPasswordError);
    }
    serializeError() {
        return [{ message: "Password incorrect" }];
    }
}
exports.IncorrectPasswordError = IncorrectPasswordError;
