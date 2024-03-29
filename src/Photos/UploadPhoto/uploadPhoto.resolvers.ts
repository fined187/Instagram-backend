import { uploadToS3 } from './../../Shared/shared.utils';
import client from "../../client";
import { protectedResolver } from "../../Users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async(_, {file, caption}, {loggedInUser}: any) => {
        let hashtagObj = [];
      if (caption) {
        const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g);
        hashtagObj = processHashtags(caption);
      }
      const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads") ;
      return client.photo.create({
        data: {
          file: fileUrl,
          caption,
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
          ...(hashtagObj.length > 0 && {
            hashtags: {
              connectOrCreate: hashtagObj
            },
          }),
        },
      });
    })
  }
}