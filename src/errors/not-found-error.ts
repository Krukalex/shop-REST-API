import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("Route not found");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeError(): Array<{ message: string; field?: string }> {
    return [{ message: "Not found" }];
  }
}
