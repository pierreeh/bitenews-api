const bcrypt = require("bcrypt");

const db = require("../../utils/db");
const { HandleHttpError } = require("../../middlewares/httpError.middleware");

async function findUserByEmail(email) {
  const user = await db.user.findUnique({ where: { email } });
  return !!user;
}

async function comparePassword(email, password) {
  const user = await db.user.findUnique({ where: { email } });
  const passwordMatch = await bcrypt.compare(password, user.password);
  return passwordMatch;
}

async function registerUser(email, password, username) {
  try {
    if (await findUserByEmail(email)) {
      throw new HandleHttpError(400, "Email already taken.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await db.user.create({
      data: { email, password: hashedPassword, username },
    });
    return user;
  } catch (e) {
    throw e;
  }
}

async function signinUser(email, password) {
  try {
    if (
      !(await findUserByEmail(email)) ||
      !(await comparePassword(email, password))
    ) {
      throw new HandleHttpError(400, "Email and password doesn't match.");
    }

    // TODO - check if email is verified
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true },
    });
    return user;
  } catch (e) {
    throw e;
  }
}

module.exports = { registerUser, signinUser };
