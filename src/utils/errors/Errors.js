class DefaultError {
  constructor() {
    this.isError = true;
  }
}

class BadRequestError extends DefaultError {
  constructor(message) {
    super();
    this.status = 400;
    this.message = message;
  }
}

class UnauthorizedError extends DefaultError {
  constructor(message) {
    super();
    this.status = 401;
    this.message = message;
  }
}

class UnauthorizedTokenError extends DefaultError {
  constructor(message) {
    super();
    this.status = 401;
    this.code = 1;
    this.message = message;
  }
}

class PaymentRequiredError extends DefaultError {
  constructor(message) {
    super();
    this.status = 402;
    this.message = message;
  }
}

class ForbiddenError extends DefaultError {
  constructor(message) {
    super();
    this.status = 403;
    this.message = message;
  }
}

class NotFoundError extends DefaultError {
  constructor(message) {
    super();
    this.status = 404;
    this.message = message;
  }
}

class InternalServerError extends DefaultError {
  constructor() {
    super();
    this.code = 500;
    this.message = "Internal Server Error";
  }
}

module.exports.DefaultError = DefaultError;
module.exports.BadRequestError = BadRequestError;
module.exports.UnauthorizedError = UnauthorizedError;
module.exports.UnauthorizedTokenError = UnauthorizedTokenError;
module.exports.PaymentRequiredError = PaymentRequiredError;
module.exports.ForbiddenError = ForbiddenError;
module.exports.NotFoundError = NotFoundError;
module.exports.InternalServerError = InternalServerError;
