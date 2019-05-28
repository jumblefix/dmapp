import * as bcryptjs from 'bcryptjs';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { errorMessages } from '~utils/common';
import { AppContext } from '../../../types/types';
import { User } from '../../entity/User';

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: AppContext,
  ): Promise<User> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error(errorMessages.invalidUsernameOrPassword);
    }

    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) {
      throw new Error(errorMessages.invalidUsernameOrPassword);
    }

    ctx.req.session!.userId = user.id;
    ctx.req.session!.name = user.name;
    ctx.req.session!.email = user.email;
    ctx.req.session!.isAdmin = user.isAdmin;

    return user;
  }
}
