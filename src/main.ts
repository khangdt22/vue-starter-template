import App from '@/App.vue'
import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
import '@/assets/css/main.css'

const app = createApp(App)

installModules(app).then(() => {
    return app.mount('#app')
})
