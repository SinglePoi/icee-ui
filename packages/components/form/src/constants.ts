import type { InjectionKey } from 'vue'
import type { FormItemContext, FormContext } from './types'

export const formContextKey: InjectionKey<FormContext> =
  Symbol('formContextKey')
export const formItemContextKey: InjectionKey<FormItemContext> =
  Symbol('formItemContextKey')