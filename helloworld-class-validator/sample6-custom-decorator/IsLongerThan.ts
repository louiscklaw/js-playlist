import { registerDecorator } from 'class-validator'
import { ValidationOptions } from 'class-validator'
import { ValidatorConstraintInterface } from 'class-validator'
import { ValidatorConstraint } from 'class-validator'
import { ValidationArguments } from 'class-validator'

export function IsLongerThan(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsLongerThanConstraint,
    })
  }
}

@ValidatorConstraint({ name: 'isLongerThan' })
export class IsLongerThanConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints
    const relatedValue = (args.object as any)[relatedPropertyName]
    return typeof value === 'string' && typeof relatedValue === 'string' && value.length > relatedValue.length
  }
}
