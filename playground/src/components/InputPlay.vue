<template>
  <ic-input
    v-model="state"
    @compositionstart="handleCompositionStart"
    @compositionupdate="handleCompositionUpdate"
    @compositionend="handleCompositionEnd"
  />
  <p style="margin-top: 100px">{{ `state: ${state}` }}</p>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const state = ref('稀土掘金')
watch(
  () => state.value,
  (newVal) => {
    console.log('state值：', newVal)
  }
)

const handleCompositionStart = (event: CompositionEvent) => {
  console.log('拼音输入法开始输入')
}
const handleCompositionUpdate = (event: CompositionEvent) => {
  console.log('拼音输入法输入的值为', event.data)
}
const handleCompositionEnd = (event: CompositionEvent) => {
  console.log('完成中文输入', event.data)
}
</script>
