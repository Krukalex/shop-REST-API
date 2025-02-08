"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const custom_error_1 = require("./custom-error");
class UnauthorizedError extends custom_error_1.CustomError {
    constructor() {
        super("User not authorized");
        this.statusCode = 401;
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
    serializeError() {
        return [{ message: "User not authorized to perform this operation" }];
    }
}
exports.UnauthorizedError = UnauthorizedError;
