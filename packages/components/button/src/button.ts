import type { ExtractPropTypes, PropType } from 'vue'
import type Button from './button.vue'

// 点击事件
export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type ButtonEmits = typeof buttonEmits

// size 组件大小
export type ButtonSize = '' | 'default' | 'small' | 'large'
// 使用 type 来定义按钮的样式
export type ButtonType =
  | ''
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'info'
  | 'danger'
  | 'text'
// type 原始类型
export type ButtonNativeType = 'button' | 'submit' | 'reset'

export const buttonProps = {
  nativeType: {
    type: String as PropType<ButtonNativeType>,
    default: 'button',
  },
  icon: {
    type: [Object, String] as PropType<object | string>,
    default: '',
  },
  size: String as PropType<ButtonSize>,
  type: String as PropType<ButtonType>,
  plain: Boolean,
  round: Boolean,
  circle: Boolean,
  disabled: Boolean,
  autofocus: Boolean,
} as const

// Props 类型
export type ButtonProps = ExtractPropTypes<typeof buttonProps>
// Button 组件实例类型
export type ButtonInstance = InstanceType<typeof Button>
