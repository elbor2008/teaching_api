import {
  Controller,
  Post,
  Get,
  BodyParams,
  PathParams,
  Put,
  QueryParams,
  Delete,
  Scope,
  ProviderScope
} from '@tsed/common';
import { ClassroomService } from '../services/ClassroomService';
import { ClassroomVO } from '../vos/ClassroomVO';
import { BadRequest } from 'ts-httpexceptions';
import { BaseController } from './BaseController';
import { ClazzService } from '../services/ClazzService';
import { CourseService } from '../services/CourseService';

@Controller('/classrooms')
@Scope(ProviderScope.REQUEST)
export class ClassroomController extends BaseController<ClassroomVO> {
  constructor(
    private service: ClassroomService,
    private clazzService: ClazzService,
    private courseService: CourseService
  ) {
    super();
  }
  @Get('/')
  async getAll() {
    return await this.service.getAll();
  }
  @Get('/teacher/:teacherId')
  async getAllByTeacher(@PathParams('teacherId') teacherId: string) {
    return await this.service.getAllByTeacher(teacherId);
  }
  @Get('/:id')
  async getById(@PathParams('id') id: string) {
    return await this.service.getById(id);
  }
  @Get('/name/:name')
  async isNameExisting(@PathParams('name') name: string) {
    const isExisting = await this.service.isNameExisting(name);
    if (isExisting) {
      return new BadRequest('classroom name already existed');
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
      return new BadRequest('classroom name already existed');
    }
    return false;
  }
  @Post('/')
  async create(@BodyParams() classroomVO: ClassroomVO) {
    if (!(await this.validate(classroomVO))) {
      return new BadRequest(this.errorInfo);
    }
    return await this.service.create(classroomVO);
  }
  @Put('/:id')
  async update(
    @PathParams('id') id: string,
    @BodyParams() classroomVO: ClassroomVO
  ) {
    if (!(await this.validate(classroomVO))) {
      return new BadRequest(this.errorInfo);
    }
    const classroom = await this.service.getById(id);
    classroom.name = classroomVO.name;
    return await this.service.update(classroom);
  }
  @Delete('/:id')
  async delete(@PathParams('id') id: string) {
    const clazzs = await this.clazzService.getByClassroomId(id);
    for (const clazz of clazzs) {
      await this.clazzService.delete(clazz.id);
      await this.courseService.deleteClazz(clazz.course.toString());
    }
    return await this.service.delete(id);
  }
}
