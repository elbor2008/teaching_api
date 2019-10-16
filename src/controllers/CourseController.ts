import {
  Controller,
  Post,
  Get,
  BodyParams,
  PathParams,
  Put,
  Scope,
  ProviderScope,
  Delete
} from '@tsed/common';
import { CourseService } from '../services/CourseService';
import { CourseVO } from '../vos/CourseVO';
import { BaseController } from './BaseController';
import { BadRequest } from 'ts-httpexceptions';
import { DateUtil } from '../utils/DateUtil';
import { ClazzService } from '../services/ClazzService';

@Controller('/courses')
@Scope(ProviderScope.REQUEST)
export class CourseController extends BaseController<CourseVO> {
  constructor(
    private service: CourseService,
    private clazzService: ClazzService
  ) {
    super();
  }
  @Get('/')
  async getAll() {
    return await this.service.getAll();
  }
  @Get('/teacher/:teacherId')
  async getAllByTeacher(@PathParams('teacherId') teacherId: string) {
    const courses = await this.service.getAllByTeacher(teacherId);
    const count = await this.service.getAllCountByTeacher(teacherId);
    return {
      courses: courses || [],
      hasMore: courses ? count > courses.length : false
    };
  }
  @Get('/teacher/:teacherId/page/:page')
  async getMoreByTeacher(
    @PathParams('teacherId') teacherId: string,
    @PathParams('page') page: number
  ) {
    const courses = await this.service.getMoreByTeacher(teacherId, page);
    const count = await this.service.getAllCountByTeacher(teacherId);
    return {
      courses: courses || [],
      hasMore: courses ? count > 9 + page * 3 : false
    };
  }
  @Get('/withClazzs')
  async getAllWithClazzs() {
    const courses = await this.service.getAllWithClazzs();
    const count = await this.service.getAllCountWithClazzs();
    return {
      courses: courses || [],
      hasMore: courses ? count > courses.length : false
    };
  }
  @Get('/withClazzs/page/:page')
  async getMoreWithClazzs(@PathParams('page') page: number) {
    const courses = await this.service.getMoreWithClazzs(page);
    const count = await this.service.getAllCountWithClazzs();
    return {
      courses: courses || [],
      hasMore: courses ? count > 9 + page * 3 : false
    };
  }
  @Get('/:id')
  async getById(@PathParams('id') id: string) {
    return await this.service.getById(id);
  }
  @Get('/name/:name')
  async isNameExisting(@PathParams('name') name: string) {
    const isExisting = await this.service.isNameExisting(name);
    if (isExisting) {
      return new BadRequest('course name already existed');
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
      return new BadRequest('course name already existed');
    }
    return false;
  }
  @Get('/courseCode/:courseCode')
  async isCourseCodeExisting(@PathParams('courseCode') courseCode: string) {
    const isExisting = await this.service.isCourseCodeExisting(courseCode);
    if (isExisting) {
      return new BadRequest('course code already existed');
    }
    return false;
  }
  @Get('/:id/courseCode/:courseCode')
  async isOtherCourseCodeExisting(
    @PathParams('id') id: string,
    @PathParams('courseCode') courseCode: string
  ) {
    const isExisting = await this.service.isOtherCourseCodeExisting(
      id,
      courseCode
    );
    if (isExisting) {
      return new BadRequest('course code already existed');
    }
    return false;
  }
  @Post('/')
  async create(@BodyParams() courseVO: CourseVO) {
    if (!(await this.validate(courseVO))) {
      return new BadRequest(this.errorInfo);
    }
    courseVO.commenceDate = DateUtil.initializeDate(courseVO.commenceDate);
    courseVO.completeDate = DateUtil.initializeDate(courseVO.completeDate);
    return await this.service.create(courseVO);
  }
  @Put('/:id/clazz/:clazzId')
  async addClazz(
    @PathParams('id') id: string,
    @PathParams('clazzId') clazzId: string
  ) {
    return await this.service.addClazz(id, clazzId);
  }
  @Put('/:id')
  async update(@PathParams('id') id: string, @BodyParams() courseVO: CourseVO) {
    if (!(await this.validate(courseVO))) {
      return new BadRequest(this.errorInfo);
    }
    const course = await this.service.getById(id);
    course.name = courseVO.name;
    course.courseCode = courseVO.courseCode;
    course.prerequisite = courseVO.prerequisite;
    course.length = courseVO.length;
    course.method = courseVO.method;
    course.objective = courseVO.objective;
    course.level = courseVO.level;
    course.commenceDate = DateUtil.initializeDate(courseVO.commenceDate);
    course.completeDate = DateUtil.initializeDate(courseVO.completeDate);
    course.tuition = courseVO.tuition;
    return await this.service.update(course);
  }
  @Delete('/:id')
  async delete(@PathParams('id') id: string) {
    await this.clazzService.deleteByCourseId(id);
    return await this.service.delete(id);
  }
}
