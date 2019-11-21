var express = require('express');
var router = express.Router();
const passport = require('passport');
const users = require('./users');
const localStrategy = require('passport-local');

passport.use(new localStrategy(users.authenticate()));
// const userModel = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

// register route
router.post('/register', function(req, res, next) {
  let userInstance = new users({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email
  })

  users.register(userInstance, req.body.password)
        .then((user) => {
          passport.authenticate('local')(req, res, function(){
            res.redirect('/profile');
          })
        })
        .catch((err) => {
          res.redirect('/');
          console.log(err);
        })
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login'  
}) ,function(req, res, next) {});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/login');
  }
}

//  showing profile page
router.get('/profile', isLoggedIn ,function(req, res, next) {
  users.find({})
        .then(users => {
          // console.log(users);
          let arrData = users.filter(user => {
            return user.username !== req.session.passport.user;
          })
          res.render('profile', {users: arrData, loggedInUser:req.session.passport.user});
          // console.log(req.session.passport.user);
          // console.log(users[0].messages.ramesh);
          // console.log(users);
        })
        .catch(err => {
          console.log(err);
        })
  
});



// handling message page
router.get('/message/:username', function(req, res, next) {
  var sentUser = req.params.username;
  var logInUser = req.session.passport.user;
  res.render('messages', {username: sentUser, loggedInUser: logInUser});
});

router.post('/message/:sender/:receiver', (req, res, next) => {
  const sender = req.params.sender;
  const receiver = req.params.receiver;

  users.findOne({username: receiver})
        .then(function(userFound){
          // console.log(userFound.messages[sender]);
          if(userFound.messages[sender] === undefined){
            userFound.messages[sender] = [];
            userFound.messages[sender].push(req.body.message);
          }else{
            userFound.messages[sender].push(req.body.message); 
          }
          userFound.markModified('messages');
          userFound.save().then(function(messageSent){
            // console.log(userFound.messages);
            // res.redirect('profile', {mes: userFound.messages});
            res.send(messageSent);
          })
        })
})



module.exports = router;
