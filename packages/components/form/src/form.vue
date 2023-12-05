<template>
  <form :class="ns.b()"><slot /></form>
</template>
<script lang="ts" setup>
import { formProps } from './form'
import { useNamespace } from '@icee-ui/hooks'
import { provide, reactive, toRefs } from 'vue'
import { formContextKey } from './constants'
import type { FormItemContext, FormContext } from './types'

defineOptions({
  name: 'IcForm',
})
const props = defineProps(formProps)
const ns = useNamespace('form')
const fields: FormItemContext[] = []

const addField: FormContext['addField'] = (context) => {
  fields.push(context)
}

const validate = async (callback: any) => {
  let validationErrors: any = {}
  for (const field of fields) {
    try {
      await field.validate('')
    } catch (errors: any) {
      validationErrors = {
        ...errors.fields,
        ...(field as any),
      }
    }
  }

  if (Object.keys(validationErrors).length === 0) return callback?.(true)
  callback?.(false, validationErrors)
}

provide(
  formContextKey,
  reactive({
    ...toRefs(props),
    addField,
  })
)

defineExpose({ validate })
</script>
