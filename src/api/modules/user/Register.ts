// import * as bcryptjs from 'bcryptjs';
import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { User } from '~api/entity/User';
import { checkIsAdminToRegister } from '~api/middlewares';
import { validateInputs } from '~api/utils/utils';
import { errorMessages, userSchema } from '~utils/common';
import { RegisterInput } from './register/RegisterInput';

@Resolver(User)
export class RegisterResolver {
  @Mutation(() => User)
  @UseMiddleware(checkIsAdminToRegister)
  async register(@Arg('data')
  {
    email,
    password,
    name,
    mobile,
    isAdmin,
  }: RegisterInput) {
    await validateInputs(userSchema, { email, password, name, mobile });

    const userAlreadyExists = await User.findOne({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error(errorMessages.emailAlreadyExists);
    }

    const user = await User.create({
      name,
      mobile,
      email,
      password,
      isAdmin,
    }).save();
    // await sendEmail()
    return user;
  }
}
