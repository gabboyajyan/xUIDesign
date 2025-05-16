import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const dts = require('rollup-plugin-dts').default;

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        input: 'lib/index.ts',
        output: {
            dir: 'dist',
            format: 'esm',
            sourcemap: true,
            preserveModules: true,
            preserveModulesRoot: 'lib'
        },
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            postcss({
                extract: false,
                minimize: true,
                modules: true,
            }),
        ],
        external: ['react', 'react-dom'],
    },
    {
        input: 'lib/index.ts',
        output: {
            dir: 'dist',
            format: 'es',
            preserveModules: true,
            preserveModulesRoot: 'lib',
        },
        plugins: [dts()],
    },
];
