import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import alias from '@rollup/plugin-alias';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const packageJson = require('./package.json');

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        input: 'lib/index.ts',
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
            }
        ],
        plugins: [
            peerDepsExternal(),
            alias({
                entries: [
                    { find: '@', replacement: path.resolve(__dirname, 'lib') }
                ]
            }),
            resolve(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
                outDir: 'dist',
                declaration: true,
                declarationDir: 'dist/types',
                rootDir: 'lib'
            }),
            postcss()
        ]
    },
    {
        input: 'dist/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        plugins: [dts()],
    }
];
