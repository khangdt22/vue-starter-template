import { SUPPORTED_LOCALES, normalizeLocale } from '@/utils/i18n'

const locale = useStorage('locale', 'auto', undefined, {
    serializer: {
        read(value) {
            return SUPPORTED_LOCALES.includes((value = normalizeLocale(value))) ? value : 'auto'
        },
        write(value): string {
            return value
        },
    },
})

const isChangingLocale = ref(false)

export const useLocale = () => locale

export const useIsChangingLocale = () => isChangingLocale
