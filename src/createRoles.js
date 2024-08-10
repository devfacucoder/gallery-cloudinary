import roleModel from "./models/roles.model.js";
/**
 *
 * esta funcion es para crear roles de users,
 * cada vez que se ejecute revisara que los roles estan creados o no
 */
export const createRoles = async () => {
  try {
    const coutsRoles = await roleModel.estimatedDocumentCount();

    if (coutsRoles > 0) return;
    const values = await Promise.all([
      new roleModel({ name: "user" }).save(),
      new roleModel({ name: "admin" }).save(),
      new roleModel({ name: "moderator" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.log(error);
  }
};
