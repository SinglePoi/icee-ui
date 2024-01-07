import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

// 文件路径
export const __filenameNew = fileURLToPath(import.meta.url)
// 目录路径
export const __dirnameNew = dirname(__filenameNew)
// 根目录
export const projRoot = resolve(__dirnameNew, '..', '..', '..')
// packages 目录
export const pkgRoot = resolve(projRoot, 'packages')
// icee-ui 目录
export const icRoot = resolve(pkgRoot, 'icee-ui')
// 打包根目录
export const buildOutput = resolve(projRoot, 'dist')
// 出口目录
export const icOutput = resolve(buildOutput, 'icee-ui')
