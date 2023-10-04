import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import WebfontDownload from 'vite-plugin-webfont-dl'
import Icons from 'unplugin-icons/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import VueMacros from 'unplugin-vue-macros/vite'
import Vue from '@vitejs/plugin-vue'
import NodePolyfills from 'rollup-plugin-polyfill-node'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Layouts from 'vite-plugin-vue-layouts'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import UnoCSS from 'unocss/vite'
import UnoPostCSS from '@unocss/postcss'

export default defineConfig({
    plugins: [
        AutoImport({
            imports: ['vue', '@vueuse/core', '@vueuse/head', '@vueuse/math', 'vue-i18n', VueRouterAutoImports],
            dirs: ['./src/composables/**', './src/utils/**'],
            dts: './types/auto-imports.d.ts',
            vueTemplate: true,
        }),
        Components({
            dirs: ['./src/components'],
            dts: './types/components.d.ts',
            resolvers: [IconsResolver()],
        }),
        Icons({ compiler: 'vue3' }),
        Layouts(),
        VueRouter({
            dts: 'types/typed-router.d.ts',
        }),
        VueI18n({
            include: ['./locales/**'],
        }),
        VueMacros({
            plugins: {
                vue: Vue(),
            },
        }),
        WebfontDownload(),
        UnoCSS(),
    ],
    resolve: {
        alias: {
            '@/': `${resolve(__dirname, 'src')}/`,
        },
    },
    css: {
        postcss: {
            plugins: [<any>UnoPostCSS],
        },
    },
    build: {
        rollupOptions: {
            plugins: [NodePolyfills()],
        },
    },
    esbuild: {
        legalComments: 'none',
    },
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: 'globalThis',
            },
            plugins: [
                <any>NodeGlobalsPolyfillPlugin({
                    buffer: true,
                    process: true,
                }),
                NodeModulesPolyfillPlugin(),
            ],
        },
    },
})
