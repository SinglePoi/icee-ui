import type { SetupContext } from 'vue'
import { inject, ref, computed, useSlots } from 'vue'
import { buttonGroupContextKey } from '@icee-ui/tokens'
import type { ButtonProps, ButtonEmits } from './button'

export const useButton = (
  props: ButtonProps,
  emit: SetupContext<ButtonEmits>['emit']
) => {
  // 按钮 html 元素
  const _ref = ref<HTMLButtonElement>()
  // 使用 inject 取出祖先组件提供的依赖
  const buttonGroupContext = inject(buttonGroupContextKey, undefined)
  const _size = computed(() => props.size || buttonGroupContext?.size)
  const _type = computed(() => props.type || buttonGroupContext?.type || '')
  const slots = useSlots()
  const _props = computed(() => {
    return {
      disabled: props.disabled,
      autofocus: props.autofocus,
      type: props.nativeType,
    }
  })

  const autoInsertSpace = computed(() => props.autoInsertSpace ?? false)

  const shouldAddSpace = computed(() => {
    const defaultSlot = slots.default?.()
    if (autoInsertSpace.value && defaultSlot?.length === 1) {
      const slot = defaultSlot[0]
      if (slot?.type === Text) {
        const text = slot.children as string
        // Unified_Ideograph 是 Unicode 的一个二值属性
        // 对于汉字，取值为 true，否则为 false
        // 一般使用 p{Unified_Ideograph} 匹配汉字
        return /^\p{Unified_Ideograph}{2}$/u.test(text.trim())
      }
    }
    return false
  })

  // 点击事件函数
  const handleClick = (evt: MouseEvent) => {
    emit('click', evt)
  }
  return {
    _ref,
    _size,
    _type,
    _props,
    handleClick,
    shouldAddSpace,
  }
}
