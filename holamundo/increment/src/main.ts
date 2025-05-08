import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.config.errorHandler = (err, instance, info) => {
    console.error('Vue Error: ', err)
    console.warn('In component: ', instance)
    console.info('Error info: ', info)
}
app.mount('#app')
