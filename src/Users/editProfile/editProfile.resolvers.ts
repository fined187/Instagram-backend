import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import fs from "fs";

const resolverFn: any = async (_, 
  {
    firstName, 
    lastName,
    userName,
    email,
    password: newPassword,
    bio, 
    avatar
  }, { loggedInUser }
  ) => {
    let avatarUrl = null;
    if(avatar) {
      const {filename, createReadStream} = await avatar;
      const newfilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
      const readStream = createReadStream();
      const writeStream = fs.createWriteStream(process.cwd() + "/uploads" + newfilename);
      readStream.pip(writeStream);
      avatarUrl = `http://localhost:4000/static/${newfilename}`;
    }
    let uglyPassword = null;
    if(newPassword) {
      uglyPassword = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await client.user.update({
      where: {
        id: loggedInUser.id,
      }, 
      data: {
        firstName, lastName, userName, email, ...(uglyPassword && {password: uglyPassword}), bio, ...(avatarUrl && {avatar: avatarUrl}),
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
};