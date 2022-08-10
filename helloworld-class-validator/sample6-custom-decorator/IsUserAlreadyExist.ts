import { registerDecorator } from 'class-validator'
import { ValidationOptions } from 'class-validator'
import { ValidationArguments } from 'class-validator'

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUserAlreadyExist',
      async: true,
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return new Promise(ok => {
            if (value !== 'admin' && value !== 'user') {
              ok(true)
            } else {
              ok(false)
            }
          })
        },
      },
    })
  }
}
