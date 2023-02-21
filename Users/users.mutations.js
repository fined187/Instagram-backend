import client from "../client.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    login: async(_, {userName, password}) => {
      //  find user with args.userName
      const user = await client.user.findFirst({where: {userName}});
      if(!user) {
        return {
          ok: false,
          error: "User not found"
        };
      }
      const passwordOk = await bycrypt.compare(password, user.password);
      if(!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password."
        }
      }
      //  check password with args.password
      const token = await jwt.sign({id: user.id}, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
      //  issue a token and send it to the user
    },
  }
}