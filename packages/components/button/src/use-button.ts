import type { SetupContext } from 'vue'
import { inject, ref, computed } from 'vue'
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

  const _props = computed(() => {
    return {
      disabled: props.disabled,
      autofocus: props.autofocus,
      type: props.nativeType,
    }
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
  }
}
