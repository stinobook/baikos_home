import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import materialSymbols from 'rollup-plugin-material-symbols'
import { glob } from 'glob'
import { mkdir, opendir, readFile, writeFile, cp } from 'fs/promises'
import * as rm from 'rimraf'
import { execSync } from 'child_process'
import { env } from 'process'
import { rimraf } from 'rimraf'
import copy from 'rollup-plugin-copy'

try {
  await opendir('./www/themes')
} catch (error) {
  await cp('./src/themes', './www/themes', { recursive: true })
}

const views = await glob(['./src/views/**/*'])

let index = await readFile('./src/index.html', 'utf-8')

writeFile('./www/index.html', index)
const files = await glob(['www/**/*'], {
  ignore: ['www/manifest.json', 'www/assets', 'www/assets/**/*', 'www/index.html', 'www/themes', 'www/themes/**/*']
})
for (const file of files) {
  rm.sync(file)
}

const cleanBuild = () => ({
  name: 'clean',
  buildStart: async (dir) => {
    rimraf('./www/**/*.js', { glob: true })
    rimraf('./www/**/*.d.ts', { glob: true })
  }
})
export default [
  {
    input: ['./src/shell.ts', ...views],
    output: {
      format: 'es',
      dir: 'www'
    },
    plugins: [
      materialSymbols({
        placeholderPrefix: 'symbol'
      }),
      cleanBuild(),
      resolve(),
      typescript(),
      copy({
        targets: [{ src: 'src/img/**/*', dest: './www/' }],
        flatten: false
      })
    ]
  }
]
