import client from "../../client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    editProfile: async (_, {
      firstName,
      lastName,
      userName,
      email,
      password: newPassword,
    }, {token}
    ) => {
      const {id} = await jwt.verify(token, process.env.SECRET_KEY);
      let uglyPassword = null;
      if(newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }
      const updatedUser = await client.user.update({
        where: {
          id,
        }, 
        data: {
          firstName, lastName, userName, email, ...(uglyPassword && {password: uglyPassword}),
        }
      }
    )
    if(updatedUser.id) {
      return {
        ok: true
      } 
      } else {
        return {
          ok: false,
          error: "Could not update profile."
      }
    }
  }}
};