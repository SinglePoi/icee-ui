<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { Edit } from '@element-plus/icons-vue'
const handleClick = (e: Event) => {
  console.log(e)
}
const buttonRef = ref()
nextTick(() => {
  console.log('buttonRef', buttonRef.value.ref)
})
</script>

<template>
  <ic-button ref="buttonRef" @click="handleClick" :loading="true"
    >按钮</ic-button
  >
  <ic-button type="primary" @click="handleClick" :icon="Edit"
    >Primary</ic-button
  >
  <ic-button type="success" plain @click="handleClick">Success</ic-button>
  <ic-button type="info" round @click="handleClick">Info</ic-button>
  <ic-button type="warning" circle @click="handleClick">Warning</ic-button>
  <ic-button type="danger" disabled @click="handleClick">Danger</ic-button>
  <ic-button size="large" @click="handleClick">按钮</ic-button>
  <ic-button size="small" @click="handleClick">按钮</ic-button>
  <ic-button size="small" @click="handleClick">
    <template #icon><Edit /></template>
  </ic-button>
  <p>-------button-group-------</p>
  <ic-button-group type="success" size="large">
    <ic-button>按钮1</ic-button>
    <ic-button>按钮2</ic-button>
  </ic-button-group>
</template>

<style scoped></style>
