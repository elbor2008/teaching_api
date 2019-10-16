import { ObjectID } from 'mongodb';
import { Schema, Document, model } from 'mongoose';

export interface IClazz extends Document {
  dayOfWeek: string;
  course: ObjectID;
  students: ObjectID[];
  teacher: ObjectID;
  classroom: ObjectID;
}
const clazzSchema = new Schema(
  {
    dayOfWeek: String,
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    teacher: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    classroom: {
      type: Schema.Types.ObjectId,
      ref: 'Classroom'
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

export const ClazzModel = model<IClazz>('Clazz', clazzSchema);
