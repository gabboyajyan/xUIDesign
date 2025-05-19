// rollup.config.js
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const dts = require('rollup-plugin-dts').default;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const packageJson = require('./package.json');

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        input: 'src/index.ts',
        external: ['react', 'react-dom'],
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
                paths: {
                    "@/*": ["src/*"]
                }
            }),
            babel({
                babelHelpers: 'bundled',
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                presets: [
                    ['@babel/preset-react', { runtime: 'automatic' }],
                    '@babel/preset-typescript'
                ],
            }),
            postcss({
                extract: false,
                modules: true,
                use: {
                    sass: null
                }
            })

        ],
    },
    {
        // Generate .d.ts files
        input: 'dist/esm/types/index.d.ts',
        output: [
            {
                file: 'dist/index.d.ts',
                format: 'es'
            }
        ],
        plugins: [
            dts()
        ],
        external: [/\.css/]
    },
];
