import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import router from './router';
import Vuesax from 'vuesax';

import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";

import 'vuesax/dist/vuesax.css';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

Vue.config.productionTip = false

Vue.use(Vuesax);

new Vue({
  router,
  store,
  created() {
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBnaw_usbc9TzieTKZyO5vnMIpmxd-Lo7c",
      authDomain: "todo-react-c90f8.firebaseapp.com",
      databaseURL: "https://todo-react-c90f8-default-rtdb.firebaseio.com",
      projectId: "todo-react-c90f8",
      storageBucket: "todo-react-c90f8.appspot.com",
      messagingSenderId: "973963580957",
      appId: "1:973963580957:web:cd7e9ac15c694d0392d8f4"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    this.$store.commit('FIREBASE_INIT', app);
  },
  render: h => h(App)
}).$mount('#app')
