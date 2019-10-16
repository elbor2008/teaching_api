import { Property } from '@tsed/common';
import { IsNotEmpty } from 'class-validator';

export class ClazzVO {
  @Property()
  id: string;
  @Property()
  @IsNotEmpty({ message: 'day of week is mandatory' })
  dayOfWeek: string;
  @Property()
  @IsNotEmpty({ message: 'course is mandatory' })
  course: string;
  @Property()
  students: string[];
  @Property()
  @IsNotEmpty({ message: 'teacher is mandatory' })
  teacher: string;
  @Property()
  @IsNotEmpty({ message: 'classroom is mandatory' })
  classroom: string;
}
