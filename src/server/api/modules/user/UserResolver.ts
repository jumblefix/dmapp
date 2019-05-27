import { emailSchema } from '@utils/common';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { AppContext } from '../../types/types';
import { validateInputs } from '../../utils/utils';

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: AppContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return;
    }
    return User.findOne(ctx.req.session!.userId);
  }

  @Query(() => User, { nullable: true })
  async getUser(@Arg('id') id: string): Promise<User | undefined> {
    if (!id) {
      return;
    }
    return User.findOne(id);
  }

  @Query(() => Boolean)
  async isEmailExists(@Arg('email') email: string): Promise<boolean> {
    await validateInputs(emailSchema, { email });

    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user ? true : false;
  }
}
