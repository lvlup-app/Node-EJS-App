const express = require('express');
      router = express.Router();


// Index
router.get('/', (req, res) => {
  res.redirect('/login');
});

// Signup
router.route('/signup')
  .get((req, res) => res.render('signup', {message: req.flash('error')}))
  .post(passport.authenticate('local-signup', {successRedirect: '/skills', failureRedirect: '/signup', failureFlash: true}))

// Login
router.route('/login')
  .get((req, res) => res.render('login', {message: req.flash('error')}))
  .post(passport.authenticate('local-login', {successRedirect: '/skills', failureRedirect: '/login', failureFlash: true}))

// Logout
router.route('/logout').get((req, res) => {
  req.logout();
  res.redirect('/login');
})

module.exports = router;