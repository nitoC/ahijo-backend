export abstract class BaseErrorInstance extends Error {
  status: number | undefined;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

export class BadRequestError extends BaseErrorInstance {
  status: number | undefined;
  constructor(message: string) {
    super(message);
    this.name = "BadRequest";
    this.status = 400;
  }
}
export class NotFoundError extends BaseErrorInstance {
  status: number | undefined;
  constructor(message: string) {
    super(message);
    this.name = "BadRequest";
    this.status = 404;
  }
}
// export class Unauthorized extends BaseErrorInstance {
//   status: number | undefined;
//   constructor(message: string) {
//     super(message);
//     this.name = "BadRequest";
//     this.status = 401;
//   }
// }
export class ForbiddenError extends BaseErrorInstance {
  status: number | undefined;
  constructor(message: string) {
    super(message);
    this.name = "BadRequest";
    this.status = 403;
  }
}
export class ConflictError extends BaseErrorInstance {
  status: number | undefined;
  constructor(message: string) {
    super(message);
    this.name = "BadRequest";
    this.status = 409;
  }
}
export class UnauthorizedError extends BaseErrorInstance {
  status: number | undefined;
  constructor(message: string) {
    super(message);
    this.name = "BadRequest";
    this.status = 401;
  }
}
