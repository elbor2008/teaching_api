import { Property } from '@tsed/common';
import { IsNotEmpty } from 'class-validator';

export class CourseVO {
  @Property()
  id: string;
  @Property()
  @IsNotEmpty({ message: 'name is mandatory' })
  name: string;
  @Property()
  @IsNotEmpty({ message: 'course code is mandatory' })
  courseCode: string;
  @Property()
  prerequisite: string;
  @Property()
  @IsNotEmpty({ message: 'length is mandatory' })
  length: string; // (4 weeks, 30 weeks)
  @Property()
  @IsNotEmpty({ message: 'method is mandatory' })
  method: string; // (1: lecture, 2. turorial, 3: workshop)
  @Property()
  objective: string;
  @Property()
  @IsNotEmpty({ message: 'level is mandatory' })
  level: string; // (1: entry, 2: intermediate, 3: advanced)
  @Property()
  @IsNotEmpty({ message: 'commence date is mandatory' })
  commenceDate: Date;
  @Property()
  @IsNotEmpty({ message: 'complete date is mandatory' })
  completeDate: Date;
  @Property()
  @IsNotEmpty({ message: 'tuition is mandatory' })
  tuition: string;
  @Property()
  @IsNotEmpty({ message: 'teacher is mandatory' })
  teacher: string;
  @Property()
  clazz: string;
}
