import { User } from "../users/users.model.js";

export async function createUser(email, password, username) {
  try {
    if (await User.emailTaken(email)) {
      throw new Error("Email already taken.");
    }

    const user = new User({ email, password, username });
    await user.save();
    return user;
  } catch (e) {
    throw new Error(e);
  }
}

export function genAuthToken(user) {
  const token = user.generateAuthToken();
  return token;
}
