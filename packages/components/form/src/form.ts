import { definePropType } from '@icee-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type { FormRules } from './types'

export const formProps = {
  model: Object,
  rules: {
    type: definePropType<FormRules>(Object),
  },
} as const

export type FormProps = ExtractPropTypes<typeof formProps>
