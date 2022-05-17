// const DefaultErrorCode = 500;
// const ErrorNotFoundCode = 404;
// const ValidationErrorCode = 400;
// const UnauthorizedErrorCode = 401;
// const ForbiddenErrorCode = 403;
// const ConflictErrorCode = 409;

function errorHandler(err, req, res, next) {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500
      ? `На сервере произошла ошибка`
        : message,
    });
}

module.exports = { errorHandler };