const jwt = require("jsonwebtoken");

const { UnauthorizedError } = require("../errors/UnauthorizedError");

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  console.log("try to auth", req.url);

  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    next(new UnauthorizedError("Необходима авторизация"));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
