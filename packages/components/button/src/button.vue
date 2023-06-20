<template>
  <button
    ref="_ref"
    :class="[
      ns.b(),
      ns.m(_type),
      ns.m(_size),
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
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <ic-icon v-else :class="ns.is('loading')">
        <component :is="loadingIcon" />
      </ic-icon>
    </template>
    <ic-icon v-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </ic-icon>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { buttonGroupContextKey } from '@icee-ui/tokens'
import { useNamespace } from '@icee-ui/hooks'
import { buttonProps, buttonEmits } from './button'
import IcIcon from '@icee-ui/components/icon'
defineOptions({
  name: 'IcButton',
})
// 定义 Props
const props = defineProps(buttonProps)
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
// 使用 inject 取出祖先组件提供的依赖
const buttonGroupContext = inject(buttonGroupContextKey, undefined)
// 使用 computed 进行缓存计算
const _size = computed(() => props.type || buttonGroupContext?.size)
const _type = computed(() => props.type || buttonGroupContext?.type || '')

// 组件暴露自己的属性以及方法，去供外部使用
defineExpose({
  ref: _ref,
})
</script>

<style />
