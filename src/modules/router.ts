import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import type { UserModule } from '@/types'

export const install: UserModule['install'] = ({ use }) => {
    const router = createRouter({
        history: createWebHistory(),
        extendRoutes: (routes) => setupLayouts(routes),
    })

    use(router)
}
