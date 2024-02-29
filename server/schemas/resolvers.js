const { UserAccount, Exercise, UserExercise } = require('../models');

const resolvers = {
  Query: {
    getAllUserAccounts: async () => {
      return await UserAccount.find({});
    },
    getOneUserAccount: async (parent, { _id }) => {
      return await UserAccount.findOne({ _id });
    },
    getAllExercises: async () => {
      return await Exercise.find({})
    },
    getOneExercise: async (parent, { _id }) => {
      return await Exercise.findOne({ _id })
    },
    getUserExercises: async (parent, { userId }) => {
      return await UserExercise.find({ userId })
    }
  },
  Mutation: {
    createUserExercise: async (parent, { input }) => {
      // Check if the userId exists and corresponds to an existing user
      const existingUser = await UserAccount.findById(input.userId);
      if (!existingUser) {
        throw new Error('User not found');
      }
      // Create the UserExercise instance with the correct user reference
      const userExercise = new UserExercise({
        ...input,
        userId: existingUser._id,
      });

      await userExercise.save();
      return userExercise;
    },
    editUserExercise: async (parent, { _id, userExerciseInput }) => {
      const updatedUserExercise = await UserExercise.findOneAndUpdate(
        { _id },
        userExerciseInput,
        { new: true }
      );
      return updatedUserExercise;
    },
    deleteUserExercise: async (parent, { _id }) => {
      const result = await UserExercise.deleteOne({ _id });
      return result.deletedCount === 1;
    },
  },
};

module.exports = resolvers;