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
    v-bind="_props"
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
    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { useNamespace } from '@icee-ui/hooks'
import { buttonProps, buttonEmits } from './button'
import IcIcon from '@icee-ui/components/icon'
import { useButton } from './use-button'
defineOptions({
  name: 'IcButton',
})
// 定义 Props
const props = defineProps(buttonProps)
// 定义 emit
const emit = defineEmits(buttonEmits)
// classname 的 BEM 命名
const ns = useNamespace('button')

const { _ref, _size, _type, _props, handleClick } = useButton(props, emit)

// 组件暴露自己的属性以及方法，去供外部使用
defineExpose({
  /**@description 组件实例 */
  ref: _ref,
  /**@description 组件尺寸 */
  size: _size,
  /**@description 组件状态 */
  type: _type,
  /**@description 组件禁用 */
  disabled: props.disabled,
})
</script>

<style />
