import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    input: 'lib/index.ts',
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        json(),
        postcss({
            extract: true,
            minimize: true,
            sourceMap: true,
        }),
        typescript({
            tsconfig: './tsconfig.json',
            useTsconfigDeclarationDir: true,
            sourceMap: false,
            tsconfigOverride: {
                compilerOptions: {
                    jsx: 'react-jsx'
                }
            }
        })
    ],
};
