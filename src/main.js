import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//路由
import router from './router/router'

//全局状态管理
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

//unocss
import "@unocss/reset/tailwind.css"
import "uno.css" 


createApp(App).use(pinia).use(router).mount('#app')
