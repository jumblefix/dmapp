import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { errorMessages } from '../../../utils/common';
import { ITEMS_PER_PAGE } from '../../../utils/constants';
import { makeSlug, skipPage } from '../../../utils/utils';
import { Tag } from '../../entity/Tag';

@Resolver(Tag)
export class TagResolver {
  @Query(() => [Tag])
  async listTags(
    @Arg('page', { defaultValue: 1 }) page: number,
  ): Promise<Tag[]> {
    return Tag.find({
      skip: skipPage(page),
      take: ITEMS_PER_PAGE,
    });
  }

  @Mutation(() => Tag)
  async addTag(@Arg('title') title: string): Promise<Tag> {
    if (title && title.length < 4) {
      throw new Error(errorMessages.invalidTag);
    }

    const slug = makeSlug(title);

    const tag = await Tag.findOne({
      where: {
        slug,
      },
    });

    if (tag) {
      throw new Error(errorMessages.tagAlreadyExists);
    }

    const c = Tag.create({
      title,
    });

    return c.save();
  }
}
