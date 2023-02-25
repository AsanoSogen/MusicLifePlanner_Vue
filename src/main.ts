import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue'
import router from './router'
import { Auth, Amplify, I18n } from 'aws-amplify';
import awsconfig from './aws-exports';


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css';
import "@aws-amplify/ui-vue/styles.css";
import './assets/main.css'

Amplify.configure(awsconfig)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
