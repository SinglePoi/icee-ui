import { copyFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { resolve, dirname, join } from 'path'

const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = dirname(__filenameNew)
const projRoot = resolve(__dirnameNew, '..', '..')

const pkgRoot = resolve(projRoot, 'packages')
const epRoot = resolve(pkgRoot, 'icee-ui')
const epPackage = resolve(epRoot, 'package.json')

/** `/dist` */
const buildOutput = resolve(projRoot, 'dist')
/** `/dist/cobyte-ui` */
const epOutput = resolve(buildOutput, 'icee-ui')

// 复制
const copyFiles = () => copyFile(epPackage, join(epOutput, 'package.json'))

copyFiles()
