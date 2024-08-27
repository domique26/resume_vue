import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles.css';
import './assets/base.css';
import router from './router.js'; 

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);
app.use(router).mount('#app');
