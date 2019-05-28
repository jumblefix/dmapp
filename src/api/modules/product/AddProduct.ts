import { Arg, Mutation, Resolver } from 'type-graphql';
import { Category } from '~api/entity/Category';
import { Product } from '~api/entity/Product';
import { errorMessages } from '~utils/common';
import { ProductInput } from './ProductInput';

@Resolver()
export class AddProduct {
  @Mutation(() => Product)
  async addProduct(@Arg('data')
  {
    title,
    coverImage,
    rating,
    description,
    price,
    offerPrice,
    categoryId,
  }: ProductInput): Promise<Product> {
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
