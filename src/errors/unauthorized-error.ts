import { CustomError } from "./custom-error";

export class UnauthorizedError extends CustomError {
  statusCode = 401;
  constructor() {
    super("User not authorized");

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeError(): Array<{ message: string; field?: string }> {
    return [{ message: "User not authorized to perform this operation" }];
  }
}
