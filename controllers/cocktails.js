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

function twistsNew(req, res, next) {
  Cocktail
    .findById(req.params.id)
    .exec()
    .then((cocktail) => {
      return res.render('twists/new', { cocktail });
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


function twistsShow(req, res, next) {
  Cocktail
    .findById(req.params.id)
    .populate('comments.createdBy')
    .exec()
    .then((cocktail) => {
      if(!cocktail) return res.notFound();
      const twist = cocktail.twists.id(req.params.twistId);
      return res.render('twists/show', { cocktail, twist });
    })
    .catch(next);
}

function twistsEdit(req, res, next) {
  Cocktail
    .findById(req.params.id)
    .exec()
    .then((cocktail) => {
      if(!cocktail) return res.notFound();
      const twist = cocktail.twists.id(req.params.twistId);
      return res.render('twists/edit', { cocktail, twist });
    })
    .catch(next);
}

function twistsUpdate(req, res, next) {
  Cocktail
    .findById(req.params.id)
    .then((cocktail) => {
      if(!cocktail) return res.notFound();

      for(const field in req.body) {
        cocktail[field] = req.body[field];
      }

      return cocktail.save();
    })
    .then((cocktail) => res.redirect(`/cocktails/${cocktail.id}`))
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

function commentCreate(req, res, next) {

  req.body.createdBy = req.user;

  Cocktail
    .findById(req.params.id)
    .exec()
    .then((cocktail) => {
      if(!cocktail) return res.notFound();

      cocktail.comments.push(req.body); // create an embedded record
      // now we only need to save the hotel, not the comments model as we don't have one
      return cocktail.save();

    })
    .then((cocktail, twist) => res.redirect(`/cocktails/${cocktail.id}/twists/${twist.id}`))
    .catch(next);
}


module.exports = {
  indexCocktail: cocktailsIndex,
  showCocktail: cocktailsShow,
  newTwist: twistsNew,
  createTwist: twistsCreate,
  editTwist: twistsEdit,
  updateTwist: twistsUpdate,
  showTwist: twistsShow,
  deleteTwist: twistsDelete,
  createComment: commentCreate
};
