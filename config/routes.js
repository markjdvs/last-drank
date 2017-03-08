const router = require('express').Router();

const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const cocktails = require('../controllers/cocktails');
const oauth = require('../controllers/oauth');
const secureRoute = require('../lib/secureRoute');
const upload = require('../lib/upload');

router.get('/', (req, res) => res.render('statics/index'));

router.route('/users/:id')
  .get(secureRoute, cocktails.showUser);

router.route('/cocktails')
  .get(secureRoute, cocktails.indexCocktail);

router.route('/cocktails/:id')
  .get(secureRoute, cocktails.showCocktail);

router.route('/cocktails/:id/twists/new')
  .get(secureRoute, cocktails.newTwist);

router.route('/cocktails/:id/twists')
  .post(secureRoute, upload.single('image'), cocktails.createTwist);

router.route('/cocktails/:id/twists/:twistId')
  .get(secureRoute, cocktails.showTwist)
  .post(secureRoute, upload.single('image'), cocktails.updateTwist)
  .delete(secureRoute, cocktails.deleteTwist);

router.route('/cocktails/:id/twists/:twistId/edit')
  .get(secureRoute, cocktails.editTwist);

router.route('/cocktails/:id/twists/:twistId/comments')
  .post(secureRoute, cocktails.createComment);

router.route('/cocktails/:id/twists/:twistId/comments/:commentId')
  .delete(secureRoute, cocktails.deleteComment);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/oauth/github')
  .get(oauth.github);

router.route('/oauth/facebook')
  .get(oauth.facebook);

router.all('*', (req, res) => res.notFound());

module.exports = router;
