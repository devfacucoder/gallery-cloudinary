import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  nickname: {
    unique: true,
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
  },
  imgs: [
    {
      urlImg: String,
      idImg: String,
    },
  ],
});
userSchema.statics.enCryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
userSchema.statics.comparePassword = async (password, recivePassword) => {
  return await bcrypt.compare(password, recivePassword);
};
const userModel = model("user", userSchema);

export default userModel;
