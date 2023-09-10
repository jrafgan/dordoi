import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { IonicVue } from '@ionic/vue';
import { store } from '@/stores/userStore'; // Import the Vuex store module correctly

import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

import './theme/variables.css';

const app = createApp(App);

app.use(IonicVue);
app.use(router);
app.use(store); // Use the Vuex store module

router.isReady().then(() => {
  app.mount('#app');
});


// import { createPinia } from 'pinia'
// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router';
// import { IonicVue } from '@ionic/vue';
// import store from './store';
//
// /* Core CSS required for Ionic components to work properly */
// import '@ionic/vue/css/core.css';
//
// /* Basic CSS for apps built with Ionic */
// import '@ionic/vue/css/normalize.css';
// import '@ionic/vue/css/structure.css';
// import '@ionic/vue/css/typography.css';
//
// /* Optional CSS utils that can be commented out */
// import '@ionic/vue/css/padding.css';
// import '@ionic/vue/css/float-elements.css';
// import '@ionic/vue/css/text-alignment.css';
// import '@ionic/vue/css/text-transformation.css';
// import '@ionic/vue/css/flex-utils.css';
// import '@ionic/vue/css/display.css';
//
// /* Theme variables */
// import './theme/variables.css';
//
// const pinia = createPinia()
//
// const app = createApp(App)
//     .use(IonicVue)
//     .use(router)
//
// app.use(pinia)
//
// router.isReady().then(() => {
//   app.mount('#app');
// });
//
//
//
//
// new Vue({
//   store,
//   render: h => h(App),
// }).$mount('#app');