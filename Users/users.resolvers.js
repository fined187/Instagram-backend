import client from "../client";

export default {
  User: {
    totalFollowing: (root) => {
      console.log(root.userName);
      return 0;
    },
    totalFollowers: () => 55
  }
}