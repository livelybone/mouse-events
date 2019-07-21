import { DEFAULT_EXTENSIONS } from '@babel/core'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  plugins: [
    resolve({
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    }),
    commonjs(),
  ],
  babelPlugin(externalHelpers) {
    const babelPlugins = externalHelpers
      ? ['@babel/plugin-external-helpers']
      : []
    return babel({
      babelrc: false,
      externalHelpers,
      runtimeHelpers: true,
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      presets: [
        '@babel/preset-typescript',
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
            },
          },
        ],
      ],
      plugins:
        process.env.NODE_ENV === 'test'
          ? [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-external-helpers',
              'istanbul',
            ]
          : babelPlugins,
    })
  },
}
