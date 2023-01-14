import { Contains, IsInt, MinLength, MaxLength, IsEmail, IsFQDN, IsDate, IsNotEmpty, ArrayNotEmpty, ArrayMinSize, ArrayMaxSize } from 'class-validator'
import { Validate } from 'class-validator'
import { CustomTextLength } from './CustomTextLength'

export class Post {
  @Validate(CustomTextLength, {
    message: 'Wrong post title',
  })
  title: string
}
