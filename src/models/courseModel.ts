import { ObjectID } from 'mongodb';
import { Schema, Document, model } from 'mongoose';

export interface ICourse extends Document {
  name: string;
  courseCode: string;
  prerequisite: string;
  length: string; // (short: 4 weeks, normal: 30 weeks)
  method: string; // (lecture, turorial, workshop)
  objective: string;
  level: string; // (entry, intermediate, advanced)
  commenceDate: Date;
  completeDate: Date;
  tuition: string; // (normal: 1000, normal: 2000, high: 3000)
  teacher: ObjectID;
  clazz: ObjectID;
}
const courseSchema = new Schema(
  {
    name: String,
    courseCode: String,
    prerequisite: String,
    length: String,
    method: String,
    objective: String,
    level: String,
    commenceDate: Date,
    completeDate: Date,
    tuition: String,
    teacher: { type: Schema.Types.ObjectId, ref: 'User' },
    clazz: {
      type: Schema.Types.ObjectId,
      ref: 'Clazz'
    }
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

export const CourseModel = model<ICourse>('Course', courseSchema);
