import { Schema, model } from 'mongoose';
import { User } from '../types';

// Define schema & model
const userSchema = new Schema<User>({
  userId: { type: String, required: true, minlength: 1 },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const UserModel = model('UserModel', userSchema);
export default UserModel;
