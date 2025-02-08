"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExistingUserError = void 0;
const custom_error_1 = require("./custom-error");
class ExistingUserError extends custom_error_1.CustomError {
    constructor() {
        super("User already exists");
        this.statusCode = 409;
        Object.setPrototypeOf(this, ExistingUserError);
    }
    serializeError() {
        return [{ message: "This user already exists, enter a different email" }];
    }
}
exports.ExistingUserError = ExistingUserError;
