const jwt = require("jsonwebtoken");

const UnauthorizedErrorCode = 401;
const ForbiddenErrorCode = 403;

module.exports = (req, res, next) => {
  const authorization = req.headers.cookie;
  if (!authorization || !authorization.startsWith("jwt=")) {
    return res
      .status(ForbiddenErrorCode)
      .send({ message: "Необходима авторизация" });
  }

  const token = authorization.replace("jwt=", "");
  let payload;

  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    return res
      .status(UnauthorizedErrorCode)
      .send({ message: "Необходима авторизация" });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
