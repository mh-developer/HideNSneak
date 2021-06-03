const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const services = require('../../../app/index');
const loginDto = require('../../../domain/auth/login.dto');
const registerDto = require('../../../domain/auth/register.dto');

module.exports = {
  requiredAuth: passport.authenticate('jwt', { session: false }),
  initAuthFlow() {
    passport.use(
      new JWTstrategy(
        {
          secretOrKey: process.env.ACCESS_TOKEN_SECRET || 'devModeSecret',
          jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
          try {
            return done(null, token.user);
          } catch (error) {
            done(error);
          }
        }
      )
    );

    passport.use(
      'register',
      new localStrategy(
        {
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true,
          session: false
        },
        async (req, email, password, done) => {
          try {
            const { error } = await registerDto.validateAsync(req.body);
            if (error) {
              done(error);
            } else {
              const { name, lastname } = req.body;
              const user = await services.authService.register({
                name,
                lastname,
                email,
                password
              });
              return done(null, user);
            }
          } catch (error) {
            done(error);
          }
        }
      )
    );

    passport.use(
      'login',
      new localStrategy(
        {
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true,
          session: false
        },
        async (req, email, password, done) => {
          try {
            const { error } = await loginDto.validateAsync(req.body);
            if (error) {
              done(error);
            } else {
              const user = await services.usersService.getByFilter({ email });

              if (!user) {
                return done(null, false, { message: 'User not found' });
              }

              const validate = await user.isValidPassword(password);

              if (!validate) {
                return done(null, false, { message: 'Wrong Password' });
              }

              return done(null, user, { message: 'Logged in Successfully' });
            }
          } catch (error) {
            return done(error);
          }
        }
      )
    );
  }
};
