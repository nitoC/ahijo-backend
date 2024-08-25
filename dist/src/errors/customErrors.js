"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.ConflictError = exports.ForbiddenError = exports.NotFoundError = exports.BadRequestError = exports.BaseErrorInstance = void 0;
class BaseErrorInstance extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.BaseErrorInstance = BaseErrorInstance;
class BadRequestError extends BaseErrorInstance {
    constructor(message) {
        super(message);
        this.name = "BadRequest";
        this.status = 400;
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends BaseErrorInstance {
    constructor(message) {
        super(message);
        this.name = "BadRequest";
        this.status = 404;
    }
}
exports.NotFoundError = NotFoundError;
// export class Unauthorized extends BaseErrorInstance {
//   status: number | undefined;
//   constructor(message: string) {
//     super(message);
//     this.name = "BadRequest";
//     this.status = 401;
//   }
// }
class ForbiddenError extends BaseErrorInstance {
    constructor(message) {
        super(message);
        this.name = "BadRequest";
        this.status = 403;
    }
}
exports.ForbiddenError = ForbiddenError;
class ConflictError extends BaseErrorInstance {
    constructor(message) {
        super(message);
        this.name = "BadRequest";
        this.status = 409;
    }
}
exports.ConflictError = ConflictError;
class UnauthorizedError extends BaseErrorInstance {
    constructor(message) {
        super(message);
        this.name = "BadRequest";
        this.status = 401;
    }
}
exports.UnauthorizedError = UnauthorizedError;
