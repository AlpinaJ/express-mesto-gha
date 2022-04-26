const Card = require("../models/cardModel");

const DefaultErrorCode = 500;
const ErrorNotFoundCode = 404;
const ValidationErrorCode = 400;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res.status(DefaultErrorCode).send("Ошибка по умолчанию");
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id }).then((card) => res.send({
    name: card.name,
    link: card.link,
    owner: card.owner,
    likes: card.likes,
    _id: card._id,
  }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ValidationErrorCode).send("Переданы некорректные данные при создании карточки");
      } else {
        res.status(DefaultErrorCode).send("Ошибка по умолчанию");
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId).then((card) => {
    if (card.owner.toString() === req.user._id) {
      Card.findByIdAndDelete(req.params.cardId).then(() => res.send({
        name: card.name,
        link: card.link,
        owner: card.owner,
        likes: card.likes,
        _id: card._id,
      }));
    }
  }).catch((err) => {
    if (err.name === "CastError") {
      res.status(ErrorNotFoundCode).send("Карточка с указанным _id не найдена");
    }
  });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }).then((card) => {
    res.send({ data: card });
  })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ValidationErrorCode).send("Переданы некорректные данные для постановки лайка");
      } else if (err.name === "CastError") {
        res.status(ErrorNotFoundCode).send("Передан несуществующий _id карточки");
      } else {
        res.status(DefaultErrorCode).send("Ошибка по умолчанию");
      }
    });
};

module.exports.unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }).then((card) => {
    res.send({ data: card });
  })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ValidationErrorCode).send("Переданы некорректные данные для удалении лайка");
      } else if (err.name === "CastError") {
        res.status(ErrorNotFoundCode).send("Передан несуществующий _id карточки");
      } else {
        res.status(DefaultErrorCode).send("Ошибка по умолчанию");
      }
    });
};
