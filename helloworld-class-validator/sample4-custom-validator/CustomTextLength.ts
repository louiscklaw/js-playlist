import { ValidatorConstraintInterface } from 'class-validator'
import { ValidatorConstraint } from 'class-validator'

@ValidatorConstraint()
export class CustomTextLength implements ValidatorConstraintInterface {
  validate(text: string) {
    return text.length > 1 && text.length < 10
  }
}
