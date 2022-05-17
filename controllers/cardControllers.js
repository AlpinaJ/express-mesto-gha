const Card = require("../models/cardModel");
const {ErrorNotFound} = require("../errors/ErrorNotFound");
const {ValidationError} = require("../errors/ValidationError");
const {UnauthorizedError} = require("../errors/UnauthorizedError");
const {ForbiddenError} = require("../errors/ForbiddenError");


module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      next(err);
    });
};

module.exports.createCard = (req, res,next) => {
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
        next(new ValidationError("Переданы некорректные данные при создании карточки"))
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res,next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        if (card.owner.toString() === req.user._id) {
          Card.findByIdAndDelete(req.params.cardId).then(() => res.send({
            name: card.name,
            link: card.link,
            owner: card.owner,
            likes: card.likes,
            _id: card._id,
          }));
        }
        else{
          next(new ForbiddenError("Вы не можете удалить чужую карточку"));
        }
      } else {
          next(new ErrorNotFound("Карточка с указанным _id не найдена"));
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new ValidationError("Переданы некорректные данные удаления карточки"));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } })
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        next(new ErrorNotFound("Передан несуществующий _id карточки"));
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new ValidationError("Переданы некорректные данные для постановки лайка" ));
      } else {
        next(err);
      }
    });
};

module.exports.unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } })
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        next(new ErrorNotFound("Переданы некорректные данные для удалении лайка"));
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new ValidationError("Передан несуществующий _id карточки"));
      } else {
        next(err);
      }
    });
};
