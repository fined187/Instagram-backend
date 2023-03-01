import fs, { write } from "fs";
import client from "../../client.js";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils.js";
import {GraphQLUpload} from "graphql-upload";

const resolverFn = async (_, 
  {
    firstName, 
    lastName,
    userName,
    email,
    password: newPassword,
    bio, 
    avatar
  }, { loggedInUser, protectedResolver }
  ) => {
    const {filename, createReadStream} = await avatar;
    const readStream = createReadStream();
    const writeStream = fs.createWriteStream(process.cwd() + "/uploads" + filename);
    readStream.pip(writeStream);
    let uglyPassword = null;
    if(newPassword) {
      uglyPassword = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await client.user.update({
      where: {
        id: loggedInUser.id,
      }, 
      data: {
        firstName, lastName, userName, email, ...(uglyPassword && {password: uglyPassword}), bio,
      },
    }
  );
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
}

export default {
  Mutation: {
    editProfile: protectedResolver(
      resolverFn
    ),
  },
  Upload: GraphQLUpload,
};