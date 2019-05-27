import { errorMessages, productSchema } from '@utils/common';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Category } from '../../entity/Category';
import { Product } from '../../entity/Product';
import { ITEMS_PER_PAGE } from '../../utils/constants';
import { skipPage, validateInputs } from '../../utils/utils';
import { ProductInput } from './ProductInput';

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  async listProducts(
    @Arg('page', { defaultValue: 1 }) page: number,
  ): Promise<Product[]> {
    return Product.find({
      skip: skipPage(page),
      take: ITEMS_PER_PAGE,
      relations: ['category'],
    });
  }

  @Query(() => Product, { nullable: true })
  async getProduct(@Arg('id') id: string): Promise<Product | undefined> {
    if (!id) {
      return;
    }
    return Product.findOne(id, { relations: ['category'] });
  }

  @Query(() => [Product])
  async getProductsByCategory(
    @Arg('categoryId') categoryId: string,
    @Arg('page', { defaultValue: 1 }) page: number,
  ): Promise<Product[]> {
    const category = await Category.findOne(categoryId);
    if (!category) {
      throw new Error(errorMessages.invalidCategory);
    }

    return Product.find({
      skip: skipPage(page),
      take: ITEMS_PER_PAGE,
      where: { category },
      relations: ['category'],
    });
  }

  @Mutation(() => Product)
  async addProduct(@Arg('data')
  {
    title,
    coverImage,
    description,
    rating,
    price,
    offerPrice,
    categoryId,
  }: ProductInput): Promise<Product> {
    await validateInputs(productSchema, {
      title,
      coverImage,
      description,
      rating,
      price,
      offerPrice,
    });

    const category = await Category.findOne(categoryId);

    if (!category) {
      throw new Error(errorMessages.invalidCategory);
    }

    const c = Product.create({
      title,
      coverImage,
      rating,
      description,
      price,
      offerPrice,
      category,
    });

    return c.save();
  }
}
