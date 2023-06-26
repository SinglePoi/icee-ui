<template>
  <div :class="ns.b()">
    <input
      ref="input"
      :type="type"
      @input="handleInput"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
    />
  </div>
</template>

<script lang="ts" setup>
import { shallowRef, computed, onMounted, nextTick, ref } from 'vue'
import { useNamespace } from '@icee-ui/hooks'
import { inputEmits, inputProps } from './input'
import { UPDATE_MODEL_EVENT } from '@icee-ui/constants'

defineOptions({
  name: 'IcInput',
})

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)

const ns = useNamespace('input')

// 组件的初始值由 props.modelValue 提供，使用 computed 是为了建立一个本地的计算缓存
const nativeInputValue = computed(() =>
  !props.modelValue ? '' : String(props.modelValue)
)

// 设置组件的值
const setNativeInputValue = () => {
  const input = _ref.value
  // 在 已有值且值没有发生变化 的情况下不进行赋值
  if (!input || input.value === nativeInputValue.value) return
  input.value = nativeInputValue.value
}

// input 元素的引用
const input = shallowRef<TargetElement>()
// 进行缓存计算，因为后续还需要和 textarea 一起
const _ref = computed(() => input.value)

onMounted(() => {
  setNativeInputValue()
})

type TargetElement = HTMLInputElement

const isComposing = ref(false)

const handleInput = async (event: Event) => {
  const { value } = event.target as TargetElement
  // 如果正在使用拼音输入法，忽略该 input 事件
  if (isComposing.value) return
  // 发射 v-model 的 update:modelValue 监听事件
  emit(UPDATE_MODEL_EVENT, value)
  await nextTick()
  // 等待 DOM 更新后设置 input 表单的值
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
