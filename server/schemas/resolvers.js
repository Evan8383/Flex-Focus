const { UserAccount, UserOptions, Workout, Performance, Exercise, UserExercise } = require('../models');

const resolvers = {
  Query: {
    getAllUserAccounts: async () => {
      return await UserAccount.find({}).populate('options').populate('workouts');
    },
    getOneUserAccount: async (parent, { userId }) => {
      return await UserAccount.findOne({ _id: userId }).populate('options');
    },
    getAllExercises: async () => {
      return await Exercise.find({})
    },
    getOneExercise: async (parent, { _id }) => {
      return await Exercise.findOne({ _id })
    },
    getUserExercises: async (parent, { userId }) => {
      return await UserExercise.find({ userId }).populate('userId')
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
    createUserExercise: async (parent, { input }) => {
      // Check if the userId exists and corresponds to an existing user
      const existingUser = await UserAccount.findById(input.userId);
      if (!existingUser) {
        throw new Error('User not found');
      }
      // Create the UserExercise instance with the correct user reference
      const userExercise = new UserExercise({
        ...input,
        user: existingUser,
      });

      await userExercise.save();
      return userExercise;
    },
    editUserExercise: async (parent, { _id, input }) => {
      const updatedUserExercise = await UserExercise.findOneAndUpdate(
        { _id },
        input,
        { new: true }
      );
      return updatedUserExercise;
    },
    deleteUserExercise: async (parent, { _id }) => {
      const result = await UserExercise.deleteOne({ _id });
      return result.deletedCount === 1;
    },
  }
};

module.exports = resolvers;