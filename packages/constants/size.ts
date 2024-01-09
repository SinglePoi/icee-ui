/**@description 通用尺寸 */
export const componentSizes = ['', 'default', 'small', 'large'] as const

/**@description 类型声明 */
export type ComponentSize = (typeof componentSizes)[number]

/**@description 对照表 */
export const componentSizeMap = {
  large: 40,
  default: 32,
  small: 24,
} as const
