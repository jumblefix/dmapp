import {
  Arg,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from 'type-graphql';
import { getManager } from 'typeorm';
import { Category } from '~api/entity/Category';
import { Product } from '~api/entity/Product';
import { checkIsAdmin } from '~api/middlewares';
import { errorMessages } from '~utils/common';
import { Notification, NotificationPayload } from './Notification';

@Resolver(Product)
export class CategoryResolver {
  private autoIncrement = 0;

  @Query(() => Category, { nullable: true })
  async getCategoryById(@Arg('id') id: string): Promise<Category | undefined> {
    if (!id) {
      return;
    }
    return Category.findOne(id);
  }

  @Subscription({ topics: 'NOTIFICATIONS' })
  normalSubscription(@Root()
  {
    id,
    message,
  }: NotificationPayload): Notification {
    return { id, message, date: new Date() };
  }

  @Mutation(() => Boolean)
  async publisherMutation(
    @PubSub('NOTIFICATIONS') publish: Publisher<NotificationPayload>,
    @Arg('message', { nullable: true }) message?: string,
  ): Promise<boolean> {
    const newId = this.autoIncrement + 1;
    await publish({ id: newId, message });
    return true;
  }

  @Query(() => Category, { nullable: true })
  async getCategoryBySlug(
    @Arg('slug') slug: string,
  ): Promise<Category | undefined> {
    if (!slug) {
      throw new Error(errorMessages.invalidCategory);
    }

    const category = await Category.findOne({
      where: {
        slug,
      },
    });

    if (!category) {
      throw new Error(errorMessages.invalidCategory);
    }

    return category;
  }

  @Query(() => [Category])
  async getMainCategory(): Promise<Category[]> {
    return getManager()
      .getTreeRepository(Category)
      .findRoots();
  }

  @Query(() => Category)
  async getChildCategories(@Arg('id') id: string): Promise<Category> {
    const parent = await Category.findOne(id);
    if (!parent) {
      throw new Error(errorMessages.invalidCategory);
    }

    return getManager()
      .getTreeRepository(Category)
      .findDescendantsTree(parent);
  }

  @Query(() => Category)
  async getBreadCrumbPath(@Arg('id') id: string): Promise<Category> {
    const parent = await Category.findOne(id);
    if (!parent) {
      throw new Error(errorMessages.invalidCategory);
    }

    return getManager()
      .getTreeRepository(Category)
      .findAncestorsTree(parent);
  }

  @Mutation(() => Category)
  @UseMiddleware(checkIsAdmin)
  async addCategory(
    @Arg('name') name: string,
    @Arg('parentId', { nullable: true }) parentId: string,
  ): Promise<Category> {
    let parent;
    if (parentId) {
      parent = await Category.findOne(parentId);
      if (!parent) {
        throw new Error(errorMessages.invalidParentCategory);
      }
    }

    const c = Category.create({
      name,
      parent,
    });
    return c.save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(checkIsAdmin)
  async removeCategory(
    @Arg('id', { nullable: true }) id: string,
  ): Promise<boolean> {
    const category = await Category.findOne(id);
    if (!category) {
      return false;
    }
    await Category.remove(category);
    return true;
  }
}
