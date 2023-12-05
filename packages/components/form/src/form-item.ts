import type { Arrayable } from '@icee-ui/utils'
import { definePropType } from '@icee-ui/utils'
import { componentSizes } from '@icee-ui/constants'
import type { ExtractPropTypes } from 'vue'
import type { FormItemRule } from './types'

export type FormItemProp = Arrayable<string>

export const formItemProps = {
  label: String,
  prop: {
    type: definePropType<FormItemProp>([String, Array]),
  },
  size: {
    type: String,
    values: componentSizes,
  },
  rules: {
    type: definePropType<Arrayable<FormItemRule>>([Object, Array]),
  },
} as const

export type FormItemProps = ExtractPropTypes<typeof formItemProps>
