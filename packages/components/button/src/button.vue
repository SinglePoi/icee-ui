<template>
  <button
    ref="_ref"
    :class="[
      ns.b(),
      ns.m(type),
      ns.m(size),
      ns.is('disabled', disabled),
      ns.is('plain', plain),
      ns.is('round', round),
      ns.is('circle', circle),
    ]"
    @click="handleClick"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <ic-icon v-if="icon">
      <component :is="icon" />
    </ic-icon>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNamespace } from '@icee-ui/hooks'
import { buttonProps, buttonEmits } from './button'
import IcIcon from '@icee-ui/components/icon'
defineOptions({
  name: 'IcButton',
})
// 定义 Props
defineProps(buttonProps)
// 定义 emit
const emit = defineEmits(buttonEmits)
// classname 的 BEM 命名
const ns = useNamespace('button')
// 点击事件函数
const handleClick = (evt: MouseEvent) => {
  emit('click', evt)
}
// 按钮 html 元素
const _ref = ref<HTMLButtonElement>()
// 组件暴露自己的属性以及方法，去供外部使用
defineExpose({
  ref: _ref,
})
</script>

<style />
