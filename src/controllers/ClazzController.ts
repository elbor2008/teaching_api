import {
  Controller,
  Post,
  Get,
  BodyParams,
  PathParams,
  Put,
  Delete
} from '@tsed/common';
import { ClazzService } from '../services/ClazzService';
import { ClazzVO } from '../vos/ClazzVO';

@Controller('/clazzs')
export class ClazzController {
  constructor(private service: ClazzService) {}
  @Get('/')
  async getAll() {
    return await this.service.getAll();
  }
  @Get('/:id')
  async getById(@PathParams('id') id: string) {
    return await this.service.getById(id);
  }
  @Get('/teacher/:teacherId')
  async getDaysOfWeek(@PathParams('teacherId') teacherId: string) {
    return await this.service.getDaysOfWeek(teacherId);
  }
  @Get('/dayOfWeek/:dayOfWeek')
  async getClassroomsByDayOfWeek(@PathParams('dayOfWeek') dayOfWeek: string) {
    return await this.service.getClassroomsByDayOfWeek(dayOfWeek);
  }
  @Get('/student/:studentId/course/:courseId')
  async getClassroomsAndDaysOfWeek(
    @PathParams('studentId') studentId: string,
    @PathParams('courseId') courseId: string
  ) {
    return await this.service.getClassroomsAndDaysOfWeek(studentId, courseId);
  }
  @Post('/')
  async create(@BodyParams() clazzVO: ClazzVO) {
    return await this.service.create(clazzVO);
  }
  @Put('/:id')
  async update(@PathParams('id') id: string, @BodyParams() clazzVO: ClazzVO) {
    return this.service.update(id, clazzVO);
  }
  @Put('/:id/student/:studentId')
  async addStudent(
    @PathParams('id') id: string,
    @PathParams('studentId') studentId: string
  ) {
    return await this.service.addStudent(id, studentId);
  }
  @Delete('/:id/student/:studentId')
  async removeStudent(
    @PathParams('id') id: string,
    @PathParams('studentId') studentId: string
  ) {
    return await this.service.removeStudent(id, studentId);
  }
}
