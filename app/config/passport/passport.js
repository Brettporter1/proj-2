const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcryptjs');

const { User } = require('../../models');

module.exports = function(passport) {
  console.log('this ran first');
  passport.use(
    new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
      
      User.findOne({ 
        where:{email: email} 
      })
        .then(user => {
          if(!user){
            return done(null, false, { message: 'Email isn\'t registered' });
          }

          bCrypt.compare(password, user.password, (err, isMatch) => {
            
            if (err) throw err;

            if(isMatch){
              console.log(user.dataValues);
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
    console.log('serializing user: ', user.id);
    done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => {
    done(null, user);
    }).catch(done);
    });

}