import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { User } from '~api/entity/User';
import { validateInputs } from '~api/utils/utils';
import { AppContext } from '~types/types';
import { emailSchema } from '~utils/common';

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
