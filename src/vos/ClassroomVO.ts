import { Property } from '@tsed/common';
import { IsNotEmpty } from 'class-validator';

export class ClassroomVO {
  @Property()
  id: string;
  @Property()
  @IsNotEmpty({ message: 'classroom name is mandatory' })
  name: string;
  @Property()
  @IsNotEmpty({ message: 'teacher is mandatory' })
  teacherId: string;
}
