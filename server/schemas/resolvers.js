const { UserAccount, UserOptions } = require('../models');

const resolvers = {
  Query: {
    getAllUserAccounts: async () => {
      return await UserAccount.find({}).populate('options');
    },
    getOneUserAccount: async (parent, { id }) => {
      return await UserAccount.findOne({ id }).populate('options');
    }
  },
  Mutation: {
    setUserOptions: async (parent, args) => {
      const { userId, darkMode, fitnessGoal } = args;
      
      const userToUpdate = await UserAccount.findOne({ _id: userId })
      if (userToUpdate.options) {
        const updatedOptions = await UserOptions.findOneAndUpdate(
          { _id: userToUpdate.options._id },
          {
            darkMode: darkMode,
            fitnessGoal: fitnessGoal
          },
          { new: true });

        await updatedOptions.save();
        return await UserAccount.findOneAndUpdate(
          { _id: userId },
          { $set: { options: updatedOptions._id } },
          { new: true }).populate('options'
          );
      }

      const newOptions = await UserOptions.create(
        {
          darkMode: darkMode,
          fitnessGoal: fitnessGoal
        }
      );
      await newOptions.save();
      return await UserAccount.findOneAndUpdate(
        { _id: userId },
        { $set: { options: newOptions._id } },
        { new: true }).populate('options');
    },
  }
};

module.exports = resolvers;