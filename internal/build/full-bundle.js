import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import replace from '@rollup/plugin-replace'
import VueMacros from 'unplugin-vue-macros/rollup'

// 文件路径
export const __filenameNew = fileURLToPath(import.meta.url)
// 目录路径
export const __dirnameNew = dirname(__filenameNew)
// 根目录
export const projRoot = resolve(__dirnameNew, '..', '..')
// packages 目录
export const pkgRoot = resolve(projRoot, 'packages')
// icee-ui 目录
export const icRoot = resolve(pkgRoot, 'icee-ui')
// 打包根目录
export const buildOutput = resolve(projRoot, 'dist')
// 出口目录
export const icOutput = resolve(buildOutput, 'icee-ui')

export const buildFullEntry = async () => {
  const bundle = await rollup({
    input: resolve(icRoot, 'index.ts'), // 入口文件
    plugins: [
      // 配置插件
      VueMacros({
        plugins: {
          vue: vue(),
        },
      }),
      nodeResolve({
        extensions: ['.ts'], // 使 rollup 支持 TypeScript
      }),
      replace({
        'process.env.NODE_ENV': '"production"',
        preventAssignment: true, // 这个选项用于防止在字符串后面紧跟一个等号时进行替换。可以用于避免错误的赋值操作
      }),
      esbuild(),
    ],
    external: ['vue'], // 构建产物中不包含
  })
  bundle.write({
    format: 'umd',
    file: resolve(icOutput, 'dist', 'index.full.js'),
    name: 'IceeUI', // 将整个组件库要设置一个变量名称：`CobyteUI`
    globals: {
      vue: 'Vue', // 组件库中需要使用到的全局变量 Vue
    },
  })
}

// buildFullEntry()
