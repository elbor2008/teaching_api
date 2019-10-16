import { Service, Scope, ProviderScope } from '@tsed/di';
import { ClassroomModel, IClassroom } from '../models/classroomModel';
import { ClassroomVO } from '../vos/ClassroomVO';

@Service()
@Scope(ProviderScope.REQUEST)
export class ClassroomService {
  async getAll() {
    return await ClassroomModel.find()
      .sort({ name: 1 })
      .exec();
  }
  async getAllByTeacher(teacherId: string) {
    return await ClassroomModel.find({ teacherId })
      .sort({ name: 1 })
      .exec();
  }
  async getById(id: string) {
    return await ClassroomModel.findById(id).exec();
  }
  async isNameExisting(name: string) {
    return await ClassroomModel.exists({ name });
  }
  async isOtherNameExisting(id: string, name: string) {
    return await ClassroomModel.exists({
      _id: { $ne: id },
      name
    });
  }
  async create(classroomVO: ClassroomVO) {
    const classroom = new ClassroomModel(classroomVO);
    return await classroom.save();
  }
  async update(classroom: IClassroom) {
    return await classroom.save();
  }
  async delete(id: string) {
    return await ClassroomModel.findByIdAndDelete(id).exec();
  }
}
