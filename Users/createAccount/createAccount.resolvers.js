import client from "../../client.js";
import bycrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async(_, {
      firstName,
      lastName,
      userName,
      email,
      password,
    }) => {
      //  check if username or email are already on DB.
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                userName,
              },
              {
                email,
              },
            ]
          }
        });
        if (existingUser) {
          throw new Error("This username/password is already taken.");
        }
        //  hash password
        const uglyPassword = await bycrypt.hash(password, 10);
        return client.user.create({data: {
          userName, 
          email, 
          firstName, 
          lastName, 
          password: uglyPassword
        }});
      } catch(e) {
        return e;
      }
    },
  }
}