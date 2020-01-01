const LocalStrategy = require('passport-local').Strategy;
const Sequelize = require('sequelize');
const path = require('path');
const bCrypt = require('bcryptjs');
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, '..', 'config.json'))[env];
let sequelize = new Sequelize(config.database, config.username, config.password, config);
const User = require('../../models/User')(sequelize, Sequelize);

module.exports = function(passport) {
  console.log('I am here')
  passport.use( 'local-login',
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      
      User.findOne({ 
        where:{email: email} 
      })
        .then(user => {
          if(!user){
            return done(null, false, { message: 'Email isn\'t registered' });
          }

          bCrypt.compare(password, user.password, (err, isMatch) => {
            console.log(password, user.password);
            if (err) throw err;

            if(isMatch){
              return done(null, user);
            } else {
              return done(null, false, { message:'Password incorrect' })
            }
          })
        })
        .catch(err => console.log(err));
    })
  )
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err,user);
    })
  })
}