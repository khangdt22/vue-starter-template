import { createI18n } from 'vue-i18n'
import { defaultDocument } from '@vueuse/core'
import type { UserModule } from '@/types'

export const install: UserModule['install'] = async ({ use }) => {
    const currentLocale = useLocale()
    const isChangingLocale = useIsChangingLocale()

    if (!DEFAULT_LOCALE) {
        return
    }

    let locale: string | undefined = currentLocale.value

    if (locale === 'auto' && !(locale = getBrowserLocale())) {
        locale = DEFAULT_LOCALE
    }

    defaultDocument?.querySelector('html')?.setAttribute('lang', locale)

    const i18n = createI18n({
        legacy: false,
        locale,
    })

    await loadLocaleMessages(i18n, locale)

    watch(currentLocale, async (value) => {
        const loading = setTimeout(() => (isChangingLocale.value = true), 200)

        try {
            if (value === 'auto') {
                value = getBrowserLocale() ?? DEFAULT_LOCALE
            }

            if (!i18n.global.availableLocales.includes(value)) {
                await loadLocaleMessages(i18n, value)
            }

            setI18nLocale(i18n, value)
        } catch (error) {
            console.error(error)
        }

        clearTimeout(loading)
        isChangingLocale.value = false
    })

    use(i18n)
}
