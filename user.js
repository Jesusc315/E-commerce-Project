import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // To hash passwords

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // 
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
    },
  ],
});

// Middleware to hash password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to check if the password is correct
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export {User}
