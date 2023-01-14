import { IsEmail } from 'class-validator'

export class BaseContent {
  @IsEmail()
  email: string
}
