import {
  Controller,
  Get,
  PathParams,
  Scope,
  ProviderScope
} from '@tsed/common';
import bcrypt from 'bcrypt';
import { UserService } from '../services/UserService';
import { BadRequest } from 'ts-httpexceptions';
import { AuthUtil } from '../utils/AuthUtil';

@Controller('/auth')
@Scope(ProviderScope.REQUEST)
export class AuthController {
  constructor(private userService: UserService) {}
  @Get('/email/:email/password/:password')
  async signIn(
    @PathParams('email') email: string,
    @PathParams('password') password: string
  ) {
    const user = await this.userService.signIn(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return new BadRequest('user does not exist');
    }
    return {
      user,
      token: AuthUtil.generateToken(user.name)
    };
  }
  @Get('/name/:name')
  async signInByName(@PathParams('name') name: string) {
    const user = await this.userService.signInByName(name);
    if (!user) {
      return null;
    }
    return {
      user,
      token: AuthUtil.generateToken(user.name)
    };
  }
}
