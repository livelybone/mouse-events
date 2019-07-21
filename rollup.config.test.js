import baseConf from './rollup.config.base'

const conf = entry => ({
  input: entry.filename,
  output: entry.formats.map(format => ({
    file: `./test-lib/${entry.name}.js`,
    format,
    name: 'MouseEvents',
  })),
  plugins: [
    ...baseConf.plugins,
    baseConf.babelPlugin(false),
  ],
})

export default conf({
  name: 'index',
  filename: './src/index.ts',
  formats: ['umd'],
})
