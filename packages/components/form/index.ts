import { withInstall, withNoopInstall } from '@icee-ui/utils'
import Form from './src/form.vue'
import FormItem from './src/form-tiem.vue'

export const IcForm = withInstall(Form, {
  FormItem,
})
export default IcForm
// 通过 withInstall 方法给 FormItem 添加了一个 install 方法
export const IcFormItem = withNoopInstall(FormItem)

export type FormInstance = InstanceType<typeof Form>
export type FormItemInstance = InstanceType<typeof FormItem>
