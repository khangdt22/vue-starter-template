import { map, isKeyOf, type AnyObject } from '@khangdt22/utils/object'
import type { MaybeRef } from 'vue'
import { defaultDocument, defaultWindow } from '@vueuse/core'
import type { I18n } from 'vue-i18n'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { titleCase } from 'title-case'

export function normalizeLocale(locale: MaybeRef<string>) {
    return unref(locale).replace('_', '-').split('-')[0].toLowerCase()
}

const locales = map(import.meta.glob<AnyObject>('@/../locales/*.{js,json,json5,ts,yaml,yml}', { import: 'default' }), (path: string, importer) => {
    return [normalizeLocale(path.split('/').pop()!.split('.')[0]), importer]
})

export const SUPPORTED_LOCALES = Object.keys(locales)

export const DEFAULT_LOCALE = (import.meta.env.VITE_DEFAULT_LOCALE ?? SUPPORTED_LOCALES[0]) as string | undefined

export function getBrowserLocale() {
    let locale = defaultWindow?.navigator.language

    if (!locale || !isKeyOf(locales, (locale = normalizeLocale(locale)))) {
        return
    }

    return locale
}

export function getLocaleDisplayName(locale: MaybeRef<string>) {
    locale = unref(locale)

    const formatter = new Intl.DisplayNames([locale], {
        type: 'language',
    })

    return formatter.of(locale) ?? titleCase(locale)
}

export async function loadLocaleMessages(i18n: I18n, locale: MaybeRef<string>) {
    locale = unref(locale)

    if (!isKeyOf(locales, locale)) {
        return
    }

    i18n.global.setLocaleMessage(locale, await locales[locale]())
}

export function setI18nLocale(i18n: I18n, locale: MaybeRef<string>) {
    locale = unref(locale)

    if (!isKeyOf(locales, locale)) {
        return
    }

    if (isRef(i18n.global.locale)) {
        i18n.global.locale.value = locale
    } else {
        i18n.global.locale = locale
    }

    if (defaultDocument) {
        defaultDocument.documentElement.lang = locale
    }
}
