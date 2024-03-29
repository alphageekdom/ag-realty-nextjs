import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email Already Exists'],
      required: [true, 'Email Is Required'],
    },
    password: {
      type: String,
      required: [true, 'Password Is Required'],
    },
    username: {
      type: String,
      required: [true, 'Username Is Required'],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Property',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model('User', UserSchema);

export default User;
