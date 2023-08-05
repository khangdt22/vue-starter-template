<script lang="ts" setup>
    definePage({
        meta: {
            layout: 'error',
        },
    })

    const { t } = useI18n()
</script>

<template>
    <p class="text-base font-semibold text-indigo-600">
        {{ t('errors.not-found.code') }}
    </p>

    <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        {{ t('errors.not-found.title') }}
    </h1>

    <p class="mt-6 text-base leading-7 text-gray-600">
        {{ t('errors.not-found.description') }}
    </p>
</template>
