import { Service, Scope, ProviderScope } from '@tsed/di';
import { ClazzModel } from '../models/clazzModel';
import { ClazzVO } from '../vos/ClazzVO';
import { ICourse } from '../models/courseModel';

@Service()
@Scope(ProviderScope.REQUEST)
export class ClazzService {
  async getAll() {
    return await ClazzModel.find().exec();
  }
  async getById(id: string) {
    return await ClazzModel.findById(id).exec();
  }
  async getByClassroomId(classroomId: string) {
    return await ClazzModel.find({ classroom: classroomId }).exec();
  }
  async getDaysOfWeek(teacherId: string) {
    const clazzs = await ClazzModel.find(
      {
        teacher: teacherId
      },
      'dayOfWeek'
    ).exec();
    if (clazzs && clazzs.length > 0) {
      return clazzs.map(clazz => clazz.dayOfWeek);
    }
    return [];
  }
  async getClassroomsByDayOfWeek(dayOfWeek: string) {
    const clazzs = await ClazzModel.find({ dayOfWeek }, 'classroom').exec();
    if (clazzs && clazzs.length > 0) {
      return clazzs.map(clazz => clazz.classroom);
    }
    return [];
  }
  async getEnrolledCourseCode(studentId: string, dayOfWeek: string) {
    const clazz = await ClazzModel.findOne(
      {
        students: { $in: [studentId] },
        dayOfWeek
      },
      'course'
    )
      .populate('course')
      .exec();
    if (clazz) {
      return ((clazz.course as unknown) as ICourse).courseCode;
    }
    return null;
  }
  async getClassroomsAndDaysOfWeek(studentId: string, courseId: string) {
    const clazzs = await ClazzModel.find(
      {
        course: courseId,
        students: { $nin: [studentId] }
      },
      'dayOfWeek classroom'
    )
      .sort({ dayOfWeek: 1 })
      .populate('classroom')
      .exec();
    if (clazzs && clazzs.length > 0) {
      const classroomsAndDaysOfWeek = clazzs.reduce((prev: any, clazz: any) => {
        const { classroom, dayOfWeek } = clazz;
        const classroomId = classroom._id.toString();
        const classroomName = classroom.name;
        if (prev[classroomId]) {
          prev[classroomId] = {
            classroomName,
            daysOfWeek: [...prev[classroomId].daysOfWeek, dayOfWeek]
          };
        } else {
          prev[classroomId] = { classroomName, daysOfWeek: [dayOfWeek] };
        }
        return prev;
      }, {});
      return classroomsAndDaysOfWeek;
    }
    return {};
  }
  async create(clazzVO: ClazzVO) {
    const clazz = new ClazzModel(clazzVO);
    return await clazz.save();
  }
  async addStudent(id: string, studentId: string) {
    const clazz = await ClazzModel.findById(id).exec();
    clazz.students.push(Object(studentId));
    await clazz.save();
  }
  async update(id: string, clazzVO: ClazzVO) {
    await ClazzModel.findByIdAndUpdate(id, clazzVO, {
      new: true
    }).exec();
  }
  async delete(id: string) {
    return await ClazzModel.findByIdAndDelete(id).exec();
  }
  async deleteByCourseId(courseId: string) {
    await ClazzModel.deleteOne({ course: courseId }).exec();
  }
  async removeStudent(id: string, studentId: string) {
    const clazz = await ClazzModel.findById(id).exec();
    const index = clazz.students.findIndex(id => id.toString() === studentId);
    clazz.students.splice(index, 1);
    await clazz.save();
  }
}
