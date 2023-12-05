import type { RuleItem } from 'async-validator'
import type { Arrayable } from '@icee-ui/utils'
import type { FormItemProps } from './form-item'
import type { FormProps } from './form'
// import { SetupContext } from 'vue'

export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>
}

export interface FormItemContext extends FormItemProps {
  validate(trigger: string): Promise<any>
}
export type FormRules = Partial<Record<string, Arrayable<FormItemRule>>>

export type FormContext = FormProps & {
  // emit: SetupContext<FormEmits>['emit']
  addField: (field: FormItemContext) => void
}
