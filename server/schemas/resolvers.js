const { UserAccount, UserOptions, Workout, Performance } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {
    getAllUserAccounts: async () => {
      return await UserAccount.find({}).populate('options').populate('workouts');
    },
    getOneUserAccount: async (parent, { userId }) => {
      return await UserAccount.findOne({ _id: userId }).populate('options');
    },
  },
  Mutation: {
    login: async (parent, args) => {
      const { email, password } = args;
      const user = await UserAccount.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isValidPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const { username, email, password } = args;
      const user = await UserAccount.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
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
    createNewWorkout: async (parent, args) => {
      const { userId, workoutName, workoutCategory, workoutSubCategory, workoutDescription, workoutNotes } = args;
      const newWorkout = await Workout.create(
        {
          workoutName: workoutName,
          workoutCategory: workoutCategory,
          workoutDescription: workoutDescription,
          workoutNotes: workoutNotes
        }
      );
      await newWorkout.save();
      await UserAccount.findOneAndUpdate(
        { _id: userId },
        { $push: { workouts: newWorkout._id } },
        { new: true });
      return newWorkout;
    },
    updateWorkout: async (parent, args) => {
      const { userId, workoutId, workoutName, workoutCategory, workoutSubCategory, workoutDescription, workoutNotes } = args;
      return await Workout.findOneAndUpdate(
        { _id: workoutId },
        {
          workoutName: workoutName,
          workoutCategory: workoutCategory,
          workoutDescription: workoutDescription,
          workoutNotes: workoutNotes
        },
        { new: true });
    },
    deleteWorkout: async (parent, args) => {
      const { userId, workoutId } = args;
      await UserAccount.findOneAndUpdate(
        { _id: userId },
        { $pull: { workouts: workoutId } },
        { new: true });
      return await Workout.findOneAndDelete(
        { _id: workoutId }
      );
    },

  }
};

module.exports = resolvers;