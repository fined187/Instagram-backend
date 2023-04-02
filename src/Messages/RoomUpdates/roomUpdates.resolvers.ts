import { NEW_MESSAGE } from "../../constans";
import pubsub from "../../Pubsub";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: () => pubsub.asyncIterator(NEW_MESSAGE),
    },
  },
};