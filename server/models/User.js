const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  fullname: { type: String },
  email: { type: String, unique: true },
  phoneNumber: { type: String },
  address: { type: String },
  address2: { type: String, default: "" },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  country: { type: String },
  role: { type: String },
  password: { type: String },
  token: { type: String },
  createdAt: { type: String },
  updatedAt: { type: String },
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;

// const User = model("User", {
//   fullname: { type: String },
//   email: { type: String, unique: true },
//   phoneNumber: { type: String },
//   address: { type: String },
//   address2: { type: String, default: "" },
//   city: { type: String },
//   state: { type: String },
//   zip: { type: String },
//   country: { type: String },
//   role: { type: String },
//   password: { type: String },
//   token: { type: String },
//   createdAt: { type: String },
//   updatedAt: { type: String },
// });
