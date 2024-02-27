const { UserAccount } = require('../models');

const resolvers = {
  Query: {
    getAllUserAccounts: async () => {
      return await UserAccount.find({});
    },
    getOneUserAccount: async (parent, { id }) => {
      return await UserAccount.findOne({ id });
    }
  },
  Query: {
    getAllExercises: async () => {
      return await Exercise.find({})
    },
    getOneExercise: async (parent, { id }) => {
      return await Exercise.findOne({ id })
    }
  }
}

module.exports = resolvers;