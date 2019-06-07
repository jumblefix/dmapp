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
export class ArticleTags extends BaseEntity {
  @PrimaryColumn()
  articleId: string;

  @PrimaryColumn()
  tagId: string;

  @ManyToOne(() => Article, article => article.tagConnection, { primary: true })
  @JoinColumn({ name: 'articleId' })
  article: Promise<Article>;

  @ManyToOne(() => Tag, tag => tag.articleConnection, {
    primary: true,
  })
  @JoinColumn({ name: 'tagId' })
  tags: Promise<Tag>;
}
