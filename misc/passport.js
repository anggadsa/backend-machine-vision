const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
const { User } = require("../models");
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;
console.log(ExtractJwt.fromAuthHeaderAsBearerToken())
passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
       
        const userChecking = await User.findOne( { 
            where: {  
                id: jwt_payload.id,
                email: jwt_payload.email,
            } 
        })
        if (userChecking) {
            return done(null, jwt_payload);
        } else {
            return done(null, false);
        }
  })
);

function authenticateJwt(req, res, next) {
    passport.authenticate('jwt', function(err, user, info) {
        if (err) return next(err);
        if (!user) return res.status(401).json({success: false, message: 'Invalid Token', data: null})
        req.user = user;
        next();
    })(req, res, next);
}

module.exports = authenticateJwt
