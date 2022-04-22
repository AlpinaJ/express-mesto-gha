const Card = require('../models/cardModel');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({data: cards}))
    .catch((err) => {
      console.log(err);
    });
}

module.exports.createCard = (req, res) => {
  const {name, link} = req.body;
  Card.create({name, link, owner: req.user._id}).then(card => res.send({
    name: card.name,
    link: card.link,
    owner: card.owner,
    likes: card.likes,
    _id: card._id,
  }))
    .catch(err => console.log(err));
}

module.exports.deleteCard = (req, res) => {
  console.log("delete");
  Card.findById(req.params.cardId).then((card) => {
    console.log(card.owner.toString(), req.user._id);
    if (card.owner.toString() === req.user._id) {
      Card.findByIdAndDelete(req.params.cardId).then((card) => res.send({
        name: card.name,
        link: card.link,
        owner: card.owner,
        likes: card.likes,
        _id: card._id,
      })).catch((err) => {
        console.log(err);
      });
    }
  }).catch((err) => {
    console.log(err);
  })
}