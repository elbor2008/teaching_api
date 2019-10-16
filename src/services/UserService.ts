import { Service, Scope, ProviderScope } from '@tsed/di';
import { UserModel, IUser } from '../models/userModel';
import { UserVO } from '../vos/UserVO';

@Service()
@Scope(ProviderScope.REQUEST)
export class UserService {
  async getAll() {
    return await UserModel.find().exec();
  }
  async getById(id: string) {
    return await UserModel.findById(id).exec();
  }
  async isNameExisting(name: string) {
    return await UserModel.exists({ name });
  }
  async isOtherNameExisting(id: string, name: string) {
    return await UserModel.exists({
      _id: { $ne: id },
      name
    });
  }
  async isEmailExisting(email: string) {
    return await UserModel.exists({ email });
  }
  async isOtherEmailExisting(id: string, email: string) {
    return await UserModel.exists({
      _id: { $ne: id },
      email
    });
  }
  async signIn(email: string) {
    return await UserModel.findOne({ email }).exec();
  }
  async signInByName(name: string) {
    return await UserModel.findOne({ name }).exec();
  }
  async create(userVO: UserVO) {
    const user = new UserModel(userVO);
    return await user.save();
  }
  async update(user: IUser) {
    return await user.save();
  }
  async isCourseExisting(id: string, courseId: string) {
    const user = await UserModel.findById(id).exec();
    return user.courses.some(id => id.toString() === courseId);
  }
  async addCourse(id: string, courseId: string) {
    const user = await UserModel.findById(id).exec();
    user.courses.push(Object(courseId));
    await user.save();
  }
}
