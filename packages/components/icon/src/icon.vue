<template>
  <i :class="bem.b()">
    <slot />
  </i>
</template>

<script setup lang="ts">
import { useNamespace } from '@icee-ui/hooks'
const bem = useNamespace('icon')
defineOptions({
  name: 'IcIcon',
  inheritAttrs: false,
})
</script>
