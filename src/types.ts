import type { Awaitable } from '@vueuse/core'
import type { App } from 'vue'

export interface UserModule {
    priority?: number
    install: (app: App) => Awaitable<void>
}
