import * as bcryptjs from 'bcryptjs';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '~api/entity/User';
import { redis } from '~api/redis';
import { TokenTypes } from '~api/utils/constants';
import { createTokenLink, isAuthenticated } from '~api/utils/utils';
import { AppContext } from '~types/types';
import { errorMessages } from '~utils/common';

@Resolver()
export class UserAccountUtils {
  @Mutation(() => Boolean)
  async resendVerifySignUp(@Ctx() ctx: AppContext): Promise<boolean> {
    const userId = ctx.req.session!.userId;
    if (!userId) {
      return false;
    }
    const url = process.env.FRONTEND_HOST as string;
    const confirmLink = await createTokenLink(
      url,
      userId,
      redis,
      TokenTypes.confirm,
    );
    console.log(confirmLink);
    // TODO send confirmLink email
    return true;
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<boolean> {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return false;
    }

    const { id: userId } = user;
    const url = process.env.FRONTEND_HOST as string;
    const resetLink = await createTokenLink(
      url,
      userId,
      redis,
      TokenTypes.reset,
    );

    console.log(resetLink);
    return true;
  }

  @Mutation(() => User, { nullable: true })
  async verifyForgotPassword(
    @Arg('token') token: string,
    @Arg('password') password: string,
    @Arg('confirmPassword') confirmPassword: string,
  ): Promise<User | undefined> {
    if (password !== confirmPassword) {
      throw new Error(errorMessages.passwordsDontMatch);
    }

    const userId = await redis.get(token);
    if (!userId) {
      throw new Error(errorMessages.invalidToken);
    }

    const user = await User.findOne(userId);

    const hashedPassword = await bcryptjs.hash(password, 10);
    await User.update(userId, { password: hashedPassword });
    await redis.del(token);
    // TODO send an alert email
    return user;
  }

  @Mutation(() => User)
  async changePassword(
    @Ctx() ctx: AppContext,
    @Arg('oldPassword') oldPassword: string,
    @Arg('password') password: string,
  ): Promise<User> {
    const userId = ctx.req.session!.userId;

    isAuthenticated(ctx);

    const user = await User.findOne(userId);
    if (!user) {
      throw new Error(errorMessages.userNotFound);
    }

    const valid = await bcryptjs.compare(oldPassword, user.password);
    if (!valid) {
      throw new Error(errorMessages.invalidOldPassword);
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    await User.update(userId, { password: hashedPassword });
    // TODO send an alert email
    return user;
  }

  @Mutation(() => User)
  async changeEmail(
    @Ctx() ctx: AppContext,
    @Arg('email') email: string,
  ): Promise<User | undefined> {
    const userId = ctx.req.session!.userId;
    isAuthenticated(ctx);

    const user = await User.findOne(userId);
    if (!user) {
      throw new Error(errorMessages.userNotFound);
    }

    if (user.email === email) {
      throw new Error(errorMessages.newEmailSameAsOld);
    }

    await User.update(userId, { email });

    const newUser = await User.findOne(userId);

    // TODO send an alert email
    return newUser;
  }
}
