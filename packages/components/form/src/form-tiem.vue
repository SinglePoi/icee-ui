<template>
  <div :class="ns.b()">
    <lable :class="ns.e('label')">{{ label }}</lable>
    <div :class="ns.e('content')">
      <slot />
      <div :class="ns.e('error')">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  ref,
  reactive,
  toRefs,
  provide,
  computed,
  inject,
  onMounted,
} from 'vue'
import AsyncValidator from 'async-validator'
import { useNamespace } from '@icee-ui/hooks'
import { formItemProps } from './form-item'
import type { FormItemContext, FormItemRule } from './types'
import { formItemContextKey, formContextKey } from './constants'
import type { Arrayable } from '@icee-ui/utils'
import { ensureArray, getProps } from '@icee-ui/utils'
import { isString } from '@vue/shared'

defineOptions({
  name: 'IcFormItem',
})
const ns = useNamespace('form-item')
const props = defineProps(formItemProps)
const formContext = inject(formContextKey, undefined)
const validateMessage = ref('')

const _rules = computed(() => {
  const rules: FormItemRule[] = []
  if (props.rules) {
    rules.push(...ensureArray(props.rules))
  }
  const formRules = formContext?.rules
  if (formRules && props.prop) {
    // 合并规则
    const _rules = getProps<Arrayable<FormItemRule> | undefined>(
      formRules,
      props.prop
    )
    if (_rules) {
      rules.push(...ensureArray(_rules.value))
    }
  }
  return rules
})
/**
 * 获取满足及没有明确定义 trigger 的规则
 * @param trigger 触发方式
 */
const getFilteredRule = (trigger: string) => {
  const rules = _rules.value

  return rules.filter((rule) => {
    if (!rule.trigger || !trigger) return true
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger)
    } else {
      return rule.trigger === trigger
    }
  })
}

const onValidationFailed = (error: any) => {
  const { errors } = error
  if (!errors) {
    console.error(error)
  }
  validateMessage.value = errors
    ? errors?.[0]?.message ?? `${props.prop} is required`
    : ''
}

const onValidationSucceeded = () => {
  validateMessage.value = ''
}

/**
 * 获取 props.prop 的值，将其类型约束为 string
 */
const propString = computed(() => {
  if (!props.prop) {
    return ''
  }
  return isString(props.prop) ? props.prop : props.prop.join('.')
})

/**
 *  利用 async-validator 的 AsyncValidator 对源数据进行校验
 * @param trigger 触发方式
 */
const validate: FormItemContext['validate'] = async (trigger) => {
  const rules = getFilteredRule(trigger)

  const modelName = propString.value
  const model = formContext?.model!
  const validator = new AsyncValidator({
    [modelName]: rules,
  })

  return validator
    .validate({ [modelName]: model[modelName] }, { firstFields: true })
    .then(() => onValidationSucceeded())
    .catch((err) => {
      onValidationFailed(err)
      return Promise.reject(err)
    })
}

const context: FormItemContext = reactive({
  ...toRefs(props),
  validate,
})

/**
 * 将 form-item 的上下文数据保存到 form 的数组中
 * 方便 form 的统一校验
 */
onMounted(() => {
  if (props.prop) {
    formContext?.addField(context)
  }
})

provide(formItemContextKey, context)
</script>
