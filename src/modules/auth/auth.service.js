const db = require("../../utils/db");
const { HandleHttpError } = require("../../middlewares/httpError.middleware");

async function findUserByEmail(email) {
  const user = await db.user.findUnique({ where: { email } });
  return !!user;
}

async function registerUser(email, password, username) {
  try {
    if (await findUserByEmail(email)) {
      throw new HandleHttpError(400, "Email already taken.");
    }

    const user = await db.user.create({ data: { email, password, username } });
    return user;
  } catch (e) {
    throw e;
  }
}

module.exports = { registerUser };
