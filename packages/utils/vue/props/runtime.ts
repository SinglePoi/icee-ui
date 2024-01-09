import type { PropType } from 'vue'
import type { EpPropMergeType, IcPropInput, IcPropFinalized } from './types'
import { hasOwn } from '@vue/shared'

export const definePropType = <T>(val: any): PropType<T> => val

export const icPropKey = '__icPropKey'

/**
 * 对 props 进行优化
 * @example
  // limited options
  // the type will be PropType<'light' | 'dark'>
  buildProp({
    type: String,
    values: ['light', 'dark'],
  } as const)
  * @example
  // limited options and other types
  // the type will be PropType<'small' | 'large' | number>
  buildProp({
    type: [String, Number],
    values: ['small', 'large'],
    validator: (val: unknown): val is number => typeof val === 'number',
  } as const)
 */
export const buildProp = <
  Type = never,
  Value = never,
  Validator = never,
  Default extends EpPropMergeType<Type, Value, Validator> = never,
  Required extends boolean = false
>(
  prop: IcPropInput<Type, Value, Validator, Default, Required>
): IcPropFinalized<Type, Value, Validator, Default, Required> => {
  const { values, required, default: defaultValue, type, validator } = prop

  const _validator =
    values || validator
      ? (val: unknown) => {
          let valid = false
          let allowedValues: unknown[] = []
          if (values) {
            allowedValues = Array.from(values)
            if (hasOwn(prop, 'default')) {
              allowedValues.push(defaultValue)
            }
            valid ||= allowedValues.includes(val)
          }

          if (validator) valid ||= validator(val)
          return valid
        }
      : undefined

  const icProp: any = {
    type,
    required: !!required,
    validator: _validator,
    [icPropKey]: true,
  }
  if (hasOwn(prop, 'default')) icProp.default = defaultValue
  return icProp
}
