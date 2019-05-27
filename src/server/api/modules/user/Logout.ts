import { Ctx, Mutation, Resolver } from 'type-graphql';
import { AppContext } from '../../types/types';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: AppContext): Promise<boolean> {
    const { userId } = ctx.req.session!;
    if (userId) {
      ctx.req.session!.destroy(
        /* istanbul ignore next */
        err => {
          if (err) {
            console.log(err);
          }
        },
        /* istanbul ignore next */
      );
    }
    ctx.res.clearCookie('qid');
    return userId !== '';
  }
}
