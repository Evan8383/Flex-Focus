const db = require('../config/connection');

// models
const { UserAccount, Exercise, UserExercise } = require('../models');

// cleanDB function
const cleanDB = require('./clean');

// json seed data
const userAccountSeed = require('./UserAccount.json');
const exerciseSeed = require('./ExerciseSeed.json')
const userExerciseSeed = require('./UserExercise.json')

if (process.argv[2] === '--clean') {
  db.once('open', async () => {

    console.log('Cleaning database')
    await cleanDB('UserAccount', 'useraccounts');
    await cleanDB('Exercise', 'exercises');
    await cleanDB('UserExercise', 'userexercises')

    console.log('Database cleaned');

    return process.exit(0);
  });
};

db.once('open', async () => {
  try {
    await cleanDB('UserAccount', 'useraccounts');
    await cleanDB('Exercise', 'exercises');
    await cleanDB('UserExercise', 'userexercises');
    await cleanDB('UserOptions', 'useroptions');
    await UserAccount.create(userAccountSeed);
    await Exercise.create(exerciseSeed);
    await UserExercise.create(userExerciseSeed)
  } catch (err) {
    console.error(err)
    process.exit(1);
  }
  console.log('Data successfully seeded');
  process.exit(0);
});