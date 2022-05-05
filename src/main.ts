import { createApp } from 'vue'
import App from '@/elePlus.vue'
import '@/styles/index.scss'
import router from '@/router'

const app = createApp(App)
app.use(router);
app.mount('#app')
