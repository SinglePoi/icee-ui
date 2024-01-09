import { Loading } from '@element-plus/icons-vue'

import type { Component, ExtractPropTypes } from 'vue'
import type Button from './button.vue'
import { iconPropType } from '@icee-ui/utils/vue/icon'
import { useSizeProp } from '@icee-ui/hooks/use-size'
import { definePropType } from '@icee-ui/utils'

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type ButtonEmits = typeof buttonEmits

export const buttonTypes = [
  '',
  'default',
  'primary',
  'success',
  'warning',
  'info',
  'danger',
] as const

export const buttonNativeTypes = ['button', 'submit', 'reset'] as const

export const buttonProps = {
  /**@description 确定是否加载 */
  loading: Boolean,
  /**@description 自定义的加载图标 */
  loadingIcon: {
    type: iconPropType,
    default: () => Loading,
  },
  /**@description 原生 button 类型 */
  nativeType: {
    type: String,
    values: buttonNativeTypes,
    default: 'button',
  },
  /**@description 图标 */
  icon: {
    type: iconPropType,
  },
  /**@description button 尺寸 */
  size: useSizeProp,
  /**@description button 类型 */
  type: {
    type: String,
    values: buttonTypes,
    default: '',
  },
  /**@description 是否是 plain */
  plain: Boolean,
  /**@description 是否是 round */
  round: Boolean,
  /**@description 是否是 circle */
  circle: Boolean,
  /**@description 禁用状态 */
  disabled: Boolean,
  /**@description 原生 autofocus 事件 */
  autofocus: Boolean,
  /**@@description 文本按钮*/
  link: Boolean,
  /**@description 汉字之间插入两个空白字符 */
  autoInsertSpace: {
    type: Boolean,
    default: undefined,
  },
  /**@description 自定义元素标签 */
  tag: {
    type: definePropType<string | Component>([String, Object]),
    default: 'button',
  },
} as const

// Props 类型
export type ButtonProps = ExtractPropTypes<typeof buttonProps>
// Button 组件实例类型
export type ButtonInstance = InstanceType<typeof Button>
