import { Schema, model } from "mongoose";
export const ROLES = ["user", "admin", "moderator"];
const roleSchema = new Schema(
  {
    name:String,
  },{
    versionKey:false
  }
)
const roleModel = model("role",roleSchema);
export default roleModel;