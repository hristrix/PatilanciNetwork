import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { vFade } from './composables/useFadeIn'

const app = createApp(App)

app.use(router)
app.directive('fade', vFade)

app.mount('#app')
