<script lang="ts" setup>
    const { system, store } = useColorMode()
    const mode = computed(() => (store.value === 'auto' ? system.value : store.value))
    const { state, next } = useCycleList(['dark', 'light', 'auto'], { initialValue: mode })

    const locale = useLocale()
    const isChangingLocale = useIsChangingLocale()
    const { state: currentLocale, next: nextLocale } = useCycleList(SUPPORTED_LOCALES, { initialValue: locale })

    watchEffect(() => {
        store.value = state.value as any
        locale.value = currentLocale.value
    })

    const colorModeIcon = computed(() => {
        if (store.value === 'auto') {
            return 'i-mdi-laptop'
        }

        return mode.value === 'dark' ? 'i-mdi-weather-night' : 'i-mdi-weather-sunny'
    })
</script>

<template>
    <header class="*flex-center my-6 px-4">
        <h1 class="text-2xl font-bold">
            Vite + Vue App
        </h1>
    </header>

    <main class="px-4 py-6">
        <RouterView />
    </main>

    <footer class="mt-6 px-4">
        <p class="text-center text-slate-400 dark:text-slate-500">
            [Default Layout]
        </p>

        <div class="*flex-center mt-2 space-x-4">
            <RouterLink to="/">
                <IMdiHome class="h-6 w-6" />
            </RouterLink>

            <RouterLink to="/about">
                <IMdiCardAccountDetails class="h-6 w-6" />
            </RouterLink>

            <button class="inline-block bg-transparent" type="button" @click="() => next()">
                <i :class="colorModeIcon" class="block h-6 w-6" />
            </button>

            <button
                :disabled="isChangingLocale"
                class="inline-block bg-transparent"
                type="button"
                @click="() => nextLocale()"
            >
                <IMaterialSymbolsLanguage class="h-6 w-6" />
            </button>
        </div>
    </footer>
</template>
