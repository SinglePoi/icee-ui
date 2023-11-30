import { isString } from '@vue/shared'
import { UPDATE_MODEL_EVENT } from '@icee-ui/constants'
import type { ExtractPropTypes, PropType } from 'vue'
//todo import { useSizeProp } from '@icee-ui/hooks'
import type Input from './input.vue'
import { componentSizes } from '@icee-ui/constants'

export const inputProps = {
  modelValue: {
    type: [String, Number, Object] as PropType<string | number | object>,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  size: {
    type: String,
    values: componentSizes,
    required: false,
  },
  disabled: Boolean,
  placeholder: {
    type: String,
  },
} as const

export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  compositionstart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionupdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionend: (evt: CompositionEvent) => evt instanceof CompositionEvent,
}

export type InputEmits = typeof inputEmits

export type InputInstance = InstanceType<typeof Input>
