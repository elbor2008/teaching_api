import { Schema, Document, model } from 'mongoose';
import { ObjectID } from 'mongodb';

export interface IUser extends Document {
  name: string;
  password: string;
  title: string;
  email: string;
  mobile: string;
  city: string;
  introduction: string;
  role: string; // (1:teacher,2:student)
  courses: ObjectID[];
}
const userSchema = new Schema(
  {
    name: String,
    password: String,
    title: String,
    email: String,
    mobile: String,
    city: String,
    introduction: String,
    role: String,
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Course'
      }
    ]
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
);

export const UserModel = model<IUser>('User', userSchema);
