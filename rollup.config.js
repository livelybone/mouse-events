import fs from 'fs'
import path from 'path'
import dts from 'rollup-plugin-dts'
import license from 'rollup-plugin-license'
import { uglify } from 'rollup-plugin-uglify'
import packageConf from './package.json'
import baseConf from './rollup.config.base'

const isES = process.env.PRODUCT === 'es'

const formats = ['es', 'umd']

function getEntries() {
  const reg = /\.ts$/
  return fs
    .readdirSync(path.resolve(__dirname, './src'))
    .filter(
      filename =>
        reg.test(filename) &&
        !fs.statSync(path.resolve(__dirname, './src', filename)).isDirectory(),
    )
    .map(filename => ({
      name: filename.replace(reg, ''),
      filename: path.resolve(__dirname, './src', filename),
      formats: formats.filter(f => f !== 'es'),
    }))
}

const conf = entry => ({
  input: entry.filename,
  output: entry.formats.map(format => ({
    file: `./lib/${format}/${entry.name}.js`,
    format,
    name: entry.name === 'index' ? 'MouseEvents' : `${entry.name}MouseEvents`,
  })),
  external: entry.external ? Object.keys(packageConf.dependencies || {}) : [],
  plugins: [
    ...baseConf.plugins,
    baseConf.babelPlugin(entry.external),
    entry.needUglify !== false && uglify(),
    license({
      banner: `Bundle of <%= pkg.name %>
               Generated: <%= moment().format('YYYY-MM-DD') %>
               Version: <%= pkg.version %>
               License: <%= pkg.license %>
               Author: <%= pkg.author %>`,
    }),
  ],
})

const configs = isES
  ? [
      conf({
        name: 'index',
        filename: './src/index.ts',
        formats: ['es'],
        needUglify: false,
        external: true,
      }),
      {
        input: './src/index.ts',
        output: [{ file: './index.d.ts', format: 'es' }],
        plugins: [dts()],
      },
    ]
  : getEntries().map(conf)

export default configs
