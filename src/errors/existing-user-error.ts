import { CustomError } from "./custom-error";

export class ExistingUserError extends CustomError {
  statusCode = 409;

  constructor() {
    super("User already exists");

    Object.setPrototypeOf(this, ExistingUserError);
  }

  serializeError(): Array<{ message: string; field?: string }> {
    return [{ message: "This user already exists, enter a different email" }];
  }
}
