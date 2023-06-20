import Button from './src/button.vue'
import ButtonGroup from './src/button-group.vue'

import { withInstall } from '@icee-ui/utils'
export const IcButton = withInstall(Button)
export const IcButtonGroup = withInstall(ButtonGroup)

export default IcButton

export * from './src/button'
