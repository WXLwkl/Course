import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import usePlugins from './plugins/index.js'

const app = createApp(App)
usePlugins(app)
app.use(store).use(router).mount('#app')
