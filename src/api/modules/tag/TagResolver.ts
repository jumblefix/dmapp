import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Tag } from '~api/entity/Tag';
import { errorMessages } from '~utils/common';
import { ITEMS_PER_PAGE } from '~utils/constants';
import { skipPage } from '~utils/utils';

@Resolver(Tag)
export class TagResolver {
  @Mutation(() => Tag)
  async addTag(@Arg('name') name: string): Promise<Tag> {
    if (!name && name.length < 3) {
      throw new Error(errorMessages.invalidCategory);
    }
    const tag = Tag.create({ name });
    return tag.save();
  }

  @Query(() => [Tag])
  async listTags(
    @Arg('page', { defaultValue: 1 }) page: number,
  ): Promise<Tag[]> {
    return Tag.find({
      skip: skipPage(page),
      take: ITEMS_PER_PAGE,
      relations: ['article'],
    });
  }
}
