import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Article } from './Article';
import { Tag } from './Tag';

@Entity()
export class ArticleTag extends BaseEntity {
  @PrimaryColumn()
  articleId: string;

  @PrimaryColumn()
  tagId: string;

  @ManyToOne(() => Article, article => article.tag, { primary: true })
  @JoinColumn({ name: 'articleId' })
  article: Promise<Article>;

  @ManyToOne(() => Tag, tag => tag.article, {
    primary: true,
  })
  @JoinColumn({ name: 'tagId' })
  tag: Promise<Tag>;
}
