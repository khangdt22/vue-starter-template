<script lang="ts" setup>
    const count = ref(0)
    const { t } = useI18n()
</script>

<template>
    <button class="*btn-indigo" type="button" @click="count++">
        {{ t('buttons.count', [count]) }}
    </button>
</template>
