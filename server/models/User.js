import mongoose from 'mongoose'
const { Schema, model } = mongoose

const validateEmail = (email) => {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

const userAccountSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, 'Email address is not valid'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: [validatePassword, 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character']

  }
});

// * May need to change this to async depending on if there is speed issues.
// Not sure how much an effect this will have on the server.
userAccountSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
})

userAccountSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

const UserAccount = model('UserAccount', userAccountSchema);
module.exports = UserAccount;