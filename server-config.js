var express = require('express');
var partials = require('express-partials');
var util = require('./lib/utility');
var passport = require('passport');
var User = require('./app/models/user');

var LocalStrategy = require('passport-local').Strategy;

var handler = require('./lib/request-handler');

var app = express();

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(partials());
  app.use(express.static('public'));
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser('shhhh, very secret'));
  app.use(express.session());
  app.use(passport.initialize());
  app.use(passport.session());
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(err, obj);
  });


passport.use(new LocalStrategy(function(username, password, done){
  User.findOne({ username: username}, function (err, user){
    if (err) {return done(err);}
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }//DEBUG PLZ;
    User.comparePassword(password, function(isMatch){
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  });
}));



app.get('/', util.checkUser, handler.renderIndex);
app.get('/create', util.checkUser, handler.renderIndex);

app.get('/links', util.checkUser, handler.fetchLinks);
app.post('/links', handler.saveLink);

app.get('/login', handler.loginUserForm);
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
app.get('/logout', handler.logoutUser);

app.get('/signup', handler.signupUserForm);
app.post('/signup', handler.signupUser);

app.get('/*', handler.navToLink);

module.exports = app;
