const { UserAccount } = require('../models');

const resolvers = {
  Query: {
    getAllUserAccounts: async () => {
      return await UserAccount.find({});
    },
    getOneUserAccount: async (parent, { id }) => {
      return await UserAccount.findOne({ id });
    }
  }
}

module.exports = resolvers;