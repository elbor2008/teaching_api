import { ObjectID } from 'mongodb';
import { Schema, Document, model } from 'mongoose';

export interface IClassroom extends Document {
  name: string;
  teacherId: string;
}
const classroomSchema = new Schema(
  {
    name: String,
    teacherId: String
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

export const ClassroomModel = model<IClassroom>('Classroom', classroomSchema);
