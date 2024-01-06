import { Schema, model } from 'mongoose';
import { User } from '../types';

const userSchema = new Schema<User>({
  username: { type: String, required: true, minlength: 1 },
  passwordHash: { type: String, required: true },
});

userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const UserModel = model('UserModel', userSchema);
export default UserModel;
