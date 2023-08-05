import { defineConfig, presetIcons, transformerVariantGroup, transformerDirectives, presetUno } from 'unocss'
import { presetForms } from '@julr/unocss-preset-forms'
import transformerAlias from 'unocss-transformer-alias'
import { theme } from '@unocss/preset-wind'

export default defineConfig({
    presets: [presetForms(), presetUno(), presetIcons()],
    transformers: [transformerVariantGroup(), transformerDirectives(), transformerAlias() as any],
    theme: {
        fontFamily: {
            sans: 'Inter, ' + (theme.fontFamily?.sans ?? 'sans-serif'),
        },
    },
    shortcuts: [
        {
            'flex-center': 'flex items-center justify-center',
        },
        [
            /^btn-(.*)$/,
            ([, c]) => `rounded-md bg-${c}-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-${c}-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${c}-600 disabled:opacity-50 disabled:cursor-not-allowed`,
        ],
    ],
})
