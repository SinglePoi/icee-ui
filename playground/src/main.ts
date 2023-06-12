import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

import IcIcon from '@icee-ui/components/icon'
import '@icee-ui/theme-chalk/src/index.scss'

const components = [IcIcon]

const ElementPlus = {
  install(app: any) {
    // 循环组件库中的每个组件进行安装
    components.forEach((c) => app.use(c))
  },
}

createApp(App).use(ElementPlus).mount('#app')
