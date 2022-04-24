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
  console.log(name, link);
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
  Card.findById(req.params.cardId).then((card) => {
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

module.exports.likeCard = (req, res)=>{
  Card.findByIdAndUpdate(req.params.cardId, {$addToSet: { likes: req.user._id }}).then((card)=>{
    res.send({data:card});
  }).catch((err)=> console.log(err));
}

module.exports.unlikeCard = (req, res)=>{
  Card.findByIdAndUpdate(req.params.cardId, {$pull: { likes: req.user._id }}).then((card)=>{
    res.send({data:card});
  }).catch((err)=> console.log(err));
}