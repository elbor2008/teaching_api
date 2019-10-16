import { CourseModel, ICourse } from './../models/courseModel';
import { Service, Scope, ProviderScope } from '@tsed/di';
import { CourseVO } from '../vos/CourseVO';

@Service()
@Scope(ProviderScope.REQUEST)
export class CourseService {
  async getAll() {
    return await CourseModel.find()
      .sort({ courseCode: 1 })
      .exec();
  }
  async getAllByTeacher(teacherId: string) {
    return await CourseModel.find({ teacher: teacherId })
      .sort({ courseCode: 1 })
      .limit(9)
      .populate({ path: 'clazz', populate: { path: 'classroom' } })
      .exec();
  }
  async getMoreByTeacher(teacherId: string, page: number) {
    return await CourseModel.find({ teacher: teacherId })
      .sort({ courseCode: 1 })
      .skip(9 + (page - 1) * 3)
      .limit(3)
      .populate({ path: 'clazz', populate: { path: 'classroom' } })
      .exec();
  }
  async getAllCountByTeacher(teacherId: string) {
    return await CourseModel.find({ teacher: teacherId })
      .count()
      .exec();
  }
  async getAllWithClazzs() {
    return await CourseModel.find({ clazz: { $ne: null } })
      .sort({ courseCode: 1 })
      .limit(9)
      .populate([
        { path: 'clazz', populate: { path: 'classroom' } },
        { path: 'teacher' }
      ])
      .exec();
  }
  async getMoreWithClazzs(page: number) {
    return await CourseModel.find({ clazz: { $ne: null } })
      .sort({ courseCode: 1 })
      .skip(9 + (page - 1) * 3)
      .limit(3)
      .populate([
        { path: 'clazz', populate: { path: 'classroom' } },
        { path: 'teacher' }
      ])
      .exec();
  }
  async getAllCountWithClazzs() {
    return await CourseModel.find({ clazz: { $ne: null } })
      .count()
      .exec();
  }
  async getById(id: string) {
    return await CourseModel.findById(id)
      .populate('clazz')
      .exec();
  }
  async create(courseVO: CourseVO) {
    const course = new CourseModel(courseVO);
    return await course.save();
  }
  async addClazz(id: string, clazzId: string) {
    const course = await CourseModel.findById(id).exec();
    course.clazz = Object(clazzId);
    return course.save();
  }
  async update(course: ICourse) {
    return await course.save();
  }
  async isNameExisting(name: string) {
    return await CourseModel.exists({ name });
  }
  async isOtherNameExisting(id: string, name: string) {
    return await CourseModel.exists({
      _id: { $ne: id },
      name
    });
  }
  async isCourseCodeExisting(courseCode: string) {
    return await CourseModel.exists({ courseCode });
  }
  async isOtherCourseCodeExisting(id: string, courseCode: string) {
    return await CourseModel.exists({
      _id: { $ne: id },
      courseCode
    });
  }
  async delete(id: string) {
    return await CourseModel.findByIdAndDelete(id).exec();
  }
  async deleteClazz(courseId: string) {
    const course = await CourseModel.findById(courseId).exec();
    course.clazz = null;
    await course.save();
  }
}
