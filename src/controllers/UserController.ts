import {
  Controller,
  Post,
  Get,
  BodyParams,
  PathParams,
  Put,
  QueryParams,
  Scope,
  ProviderScope
} from '@tsed/common';
import bcrypt from 'bcrypt';
import { UserService } from '../services/UserService';
import { UserVO } from '../vos/UserVO';
import { BaseController } from './BaseController';
import { BadRequest } from 'ts-httpexceptions';

@Controller('/users')
@Scope(ProviderScope.REQUEST)
export class UserController extends BaseController<UserVO> {
  constructor(private service: UserService) {
    super();
  }
  @Get('/')
  async getAll() {
    return await this.service.getAll();
  }
  @Get('/:id')
  async getById(@PathParams('id') id: string) {
    const user = await this.service.getById(id);
    return user;
  }
  @Get('/checkCourse')
  async isCourseExisting(
    @QueryParams('id') id: string,
    @QueryParams('courseId') courseId: string
  ) {
    return await this.service.isCourseExisting(id, courseId);
  }
  @Get('/name/:name')
  async isNameExisting(@PathParams('name') name: string) {
    const isExisting = await this.service.isNameExisting(name);
    if (isExisting) {
      return new BadRequest('name already existed');
    }
    return false;
  }
  @Get('/:id/name/:name')
  async isOtherNameExisting(
    @PathParams('id') id: string,
    @PathParams('name') name: string
  ) {
    const isExisting = await this.service.isOtherNameExisting(id, name);
    if (isExisting) {
      return new BadRequest('name already existed');
    }
    return false;
  }
  @Get('/email/:email')
  async isEmailExisting(@PathParams('email') email: string) {
    const isExisting = await this.service.isEmailExisting(email);
    if (isExisting) {
      throw new BadRequest('email already existed');
    }
    return false;
  }
  @Get('/:id/email/:email')
  async isOtherEmailExisting(
    @PathParams('id') id: string,
    @PathParams('email') email: string
  ) {
    const isExisting = await this.service.isOtherEmailExisting(id, email);
    if (isExisting) {
      return new BadRequest('email already existed');
    }
    return false;
  }
  @Post('/')
  async create(@BodyParams() userVO: UserVO) {
    if (!(await this.validate(userVO))) {
      return new BadRequest(this.errorInfo);
    }
    userVO.password = await bcrypt.hash(userVO.password, 10);
    return await this.service.create(userVO);
  }
  @Put('/:id')
  async update(@PathParams('id') id: string, @BodyParams() userVO: UserVO) {
    if (!(await this.validate(userVO))) {
      return new BadRequest(this.errorInfo);
    }
    const user = await this.service.getById(id);
    user.name = userVO.name;
    user.password = await bcrypt.hash(userVO.password, 10);
    user.title = userVO.title;
    user.email = userVO.email;
    user.mobile = userVO.mobile;
    user.city = userVO.city;
    user.introduction = userVO.introduction;
    user.role = userVO.role;
    return await this.service.update(user);
  }
}
