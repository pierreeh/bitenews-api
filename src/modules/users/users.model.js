import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const usersSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Invalid Email.");
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  emailVerified: { type: Boolean, default: false },
});

usersSchema.pre("save", async function (next) {
  let user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }

  next();
});

usersSchema.statics.emailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};

usersSchema.methods.generateAuthToken = function () {
  let user = this;
  const userObject = { sub: user._id.toHexString(), email: user.email };
  const token = jwt.sign(userObject, process.env.DB_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

export const User = mongoose.model("user", usersSchema);
