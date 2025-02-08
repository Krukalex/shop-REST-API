import { CustomError } from "./custom-error";

export class IncorrectPasswordError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Wrong password");

    Object.setPrototypeOf(this, IncorrectPasswordError);
  }

  serializeError(): Array<{ message: string; field?: string }> {
    return [{ message: "Password incorrect" }];
  }
}
