const Cocktail = require('../models/cocktail');

function cocktailsIndex(req, res, next) {
  Cocktail
    .find()
    .populate('createdBy')
    .exec()
    .then((cocktails) => res.render('cocktails/index', { cocktails }))
    .catch(next);
}

function cocktailsShow(req, res, next) {
  Cocktail
    .findById(req.params.id)
    .populate('twists.createdBy')
    .exec()
    .then((cocktail) => {
      if(!cocktail) return res.notFound();
      return res.render('cocktails/show', { cocktail });
    })
    .catch(next);
}

function twistsCreate(req, res, next) {
  req.body.createdBy = req.user ;

  Cocktail
    .findById(req.params.id)
    .exec()
    .then((cocktail) => {
      if(!cocktail) return res.notFound();

      cocktail.twists.push(req.body);
      return cocktail.save();

    })
    .then((cocktail) => res.redirect(`/cocktails/${cocktail.id}`))
    .catch(next);
}

function twistsEdit(req, res, next) {
  Cocktail
    .findById(req.params.id)
    .exec()
    .then((cocktail) => {
      return res.render('cocktails/twists/edit', { cocktail });
    })
    .catch(next);
}

function twistsDelete(req, res, next) {
  Cocktail
    .findById(req.params.id)
    .exec()
    .then((cocktail) => {
      if(!cocktail) return res.notFound();
      const twist = cocktail.twists.id(req.params.twistId);
      twist.remove();
      return cocktail.save();
    })
    .then((cocktail) => res.redirect(`/cocktails/${cocktail.id}`))
    .catch(next);
}

module.exports = {
  index: cocktailsIndex,
  show: cocktailsShow,
  createTwist: twistsCreate,
  editTwist: twistsEdit,
  deleteTwist: twistsDelete
};
