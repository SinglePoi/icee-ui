<template>
  <div :class="ns.b()">
    <div :class="ns.e('wrapper')">
      <input
        ref="input"
        :type="type"
        :class="ns.e('inner')"
        :placeholder="placeholder"
        @input="handleInput"
        @blur="handleBlur"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { shallowRef, computed, onMounted, nextTick, ref, inject } from 'vue'
import { useNamespace } from '@icee-ui/hooks'
import { inputEmits, inputProps } from './input'
import { UPDATE_MODEL_EVENT } from '@icee-ui/constants'
import { formItemContextKey } from '../../form/src/constants'

defineOptions({
  name: 'IcInput',
})

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const formItem = inject(formItemContextKey, undefined)

const ns = useNamespace('input')

const nativeInputValue = computed(() =>
  !props.modelValue ? '' : String(props.modelValue)
)

const setNativeInputValue = () => {
  const input = _ref.value
  if (!input || input.value === nativeInputValue.value) return
  input.value = nativeInputValue.value
}

const input = shallowRef<TargetElement>()
const _ref = computed(() => input.value)

onMounted(() => {
  setNativeInputValue()
})

type TargetElement = HTMLInputElement

const isComposing = ref(false)

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
  formItem?.validate?.('blur')
}

const handleInput = async (event: Event) => {
  // 如果正在使用拼音输入法，忽略该 input 事件
  if (isComposing.value) return
  const { value } = event.target as TargetElement
  emit(UPDATE_MODEL_EVENT, value)
  await nextTick()
  setNativeInputValue()
}

// 开始使用拼音输入法时，将 isComposing 状态更新为 true
const handleCompositionStart = (event: CompositionEvent) => {
  emit('compositionstart', event)
  isComposing.value = true
}

// 使用拼音输入法时
const handleCompositionUpdate = (event: CompositionEvent) => {
  emit('compositionupdate', event)
}

// 完成拼音输入法输入，将 isComposing 状态更新为 false
const handleCompositionEnd = (event: CompositionEvent) => {
  emit('compositionend', event)
  if (isComposing.value) {
    isComposing.value = false
    handleInput(event)
  }
}
</script>
