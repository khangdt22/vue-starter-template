import { hasOwnProperty } from '@khangdt22/utils/object'
import type { App } from 'vue'
import type { UserModule } from '@/types'

export function isUserModule(input: any): input is UserModule {
    return hasOwnProperty(input, 'install') && typeof input.install === 'function'
}

export async function getEnabledModules(): Promise<UserModule[]> {
    const modules = await Promise.all(Object.values(import.meta.glob('@/modules/*.ts')).map((m) => m()))

    return modules.filter(isUserModule).sort((a, b) => {
        return (b.priority ?? 0) - (a.priority ?? 0)
    })
}

export async function installModules(app: App) {
    const modules = await getEnabledModules()

    for (const module of modules) {
        await module.install(app)
    }
}
