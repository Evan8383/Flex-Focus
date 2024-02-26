const db = require('../config/connection');

// models
const { UserAccount } = require('../models');

// cleanDB function
const cleanDB = require('./clean');

// json seed data
const userAccountSeed = require('./UserAccount.json');

if (process.argv[2] === '--clean') {
  db.once('open', async () => {

    console.log('Cleaning database')
    await cleanDB('UserAccount', 'useraccounts');
    console.log('Database cleaned');

    return process.exit(0);
  });
};

db.once('open', async () => {
  try {
    await cleanDB('UserAccount', 'useraccounts');
    await UserAccount.create(userAccountSeed);
  } catch (err) {
    console.error(err)
    process.exit(1);
  }
  console.log('Data successfully seeded');
  process.exit(0);
});