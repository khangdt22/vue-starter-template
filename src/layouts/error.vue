<script lang="ts" setup>
    const router = useRouter()
    const { t } = useI18n()
</script>

<template>
    <main class="grid min-h-full place-items-center bg-white px-6 py-24 lg:px-8 sm:py-32">
        <div class="text-center">
            <div>
                <RouterView />
            </div>

            <div class="mt-10 flex items-center justify-center">
                <button class="*btn-indigo" type="button" @click="router.back()">
                    {{ t('buttons.back') }}
                </button>
            </div>
        </div>
    </main>
</template>
