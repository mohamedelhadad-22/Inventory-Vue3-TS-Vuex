import './assets/main.css'
import { createApp } from 'vue'
import EN from './langugage/en.json'
import AR from './langugage/ar.json'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
// import DatePicker from 'vue3-datepicker'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)

const i18n = createI18n({
  locale: 'ar',
  fallbackLocale: 'ar',
  messages: {
    en: EN,
    ar: AR
  }
})

app.use(i18n)
app.use(store)
app.use(router)
// app.component('VueDatePicker', VueDatePicker);
// app.component('DatePicker', DatePicker);
app.use(i18n)

app.use(VueAxios, axios)
app.mount('#app')
