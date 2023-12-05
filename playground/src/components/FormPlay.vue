<template>
  <ic-form
    :model="data"
    ref="formRef"
    :rules="{
      username: {
        min: 6,
        max: 10,
        message: '用户名长度最少为6位且不能超过10位',
        trigger: 'blur',
      },
    }"
  >
    <ic-form-item
      label="用户名："
      :rules="[
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        },
      ]"
      prop="username"
    >
      <ic-input v-model="data.username" />
    </ic-form-item>
  </ic-form>
  <ic-button @click="handleSubmit">提交</ic-button>
</template>

<script lang="ts" setup>
import { reactive, shallowRef } from 'vue'
import { FormInstance } from '@icee-ui/components/form/index'

const data = reactive({ username: '' })

const formRef = shallowRef<FormInstance>()

const handleSubmit = () => {
  formRef.value?.validate((valid: boolean) => {
    console.log(valid)
  })
}
</script>
