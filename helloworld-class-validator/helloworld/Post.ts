import { MaxLength, MinLength } from 'class-validator';

export enum PostType {
  Public,
  Private,
}

export class Post {
  @MinLength(10)
  @MaxLength(20)
  title: string;
}
