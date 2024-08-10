import mongoose, { model, Types } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  nickname: {
    unique: true,
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,

  },
  isVerified: { type: Boolean, default: false },
  codeVerify: { type: String },
  rol: { type: Types.ObjectId, ref: "role" },
  imgs: [
    {
      urlImg: String,
      idImg: String,
    },
  ],
});

userSchema.statics.generateVerificationCode = function() {
  const min = 100000; // Mínimo número de 7 cifras
  const max = 999999; // Máximo número de 7 cifras
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
};
userSchema.statics.enCryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
userSchema.statics.comparePassword = async (password, recivePassword) => {
  return await bcrypt.compare(password, recivePassword);
};
const userModel = model("user", userSchema);

export default userModel;
