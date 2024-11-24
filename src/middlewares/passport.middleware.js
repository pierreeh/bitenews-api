require("dotenv").config();
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const db = require("../utils/db");

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

async function jwtVerify(payload, done) {
  try {
    const user = await db.user.findUnique({ where: { id: payload.id } });
    if (!user) return done(null, false);

    done(null, user);
  } catch (e) {
    done(e, false);
  }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = jwtStrategy;
