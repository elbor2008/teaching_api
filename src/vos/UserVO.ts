import { Property } from '@tsed/common';
import { IsEmail, IsNotEmpty, IsMobilePhone } from 'class-validator';

export class UserVO {
  @Property()
  id: string;
  @Property()
  @IsNotEmpty({ message: 'name is mandatory' })
  name: string;
  @Property()
  @IsNotEmpty({ message: 'password is mandatory' })
  password: string;
  @Property()
  @IsEmail(
    {
      allow_display_name: true
    },
    { message: 'email format is incorrect' }
  )
  email: string;
  @Property()
  title: string;
  @Property()
  @IsMobilePhone(null, { message: 'phone number format is incorrect' })
  mobile: string;
  @Property()
  city: string;
  @Property()
  introduction: string;
  @Property()
  role: string;
  @Property()
  courses: string[];
}
