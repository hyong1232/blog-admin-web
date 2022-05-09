import { createApp } from 'vue'
import App from '@/elePlus.vue'
import "element-plus/dist/index.css";
import '@/styles/index.scss'
import router from '@/router'

const app = createApp(App)
app.use(router);
app.mount('#app')
