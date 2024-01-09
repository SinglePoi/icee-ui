import { componentSizes } from '@icee-ui/constants'
import { buildProp } from '@icee-ui/utils'

export const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false,
} as const)
