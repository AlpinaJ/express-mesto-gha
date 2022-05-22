const jwt = require("jsonwebtoken");

const { UnauthorizedError } = require("../errors/UnauthorizedError");

module.exports.auth= (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("Try to authorize", req.cookies)
  let payload;

  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    next(new UnauthorizedError("Необходима авторизация"));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
