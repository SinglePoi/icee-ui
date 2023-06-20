<template>
  <div :class="`${ns.b('group')}`">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { provide, reactive, toRef } from 'vue'
import { useNamespace } from '@icee-ui/hooks'
import { buttonGroupContextKey } from '@icee-ui/tokens'
import { buttonGroupProps } from './button-group'

defineOptions({
  name: 'IcButtonGroup',
})
const ns = useNamespace('button')

const props = defineProps(buttonGroupProps)
provide(
  buttonGroupContextKey,
  reactive({
    size: toRef(props, 'size'),
    type: toRef(props, 'type'),
  })
)
</script>
