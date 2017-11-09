// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import App from './App';
import router from './router';
import store from './vuex/store';

const config = {
  apiKey: 'AIzaSyC5aukYpsyD9a8rJHiiOMbFTC6c_Hywnzk',
  authDomain: 'one-slide.firebaseapp.com',
  databaseURL: 'https://one-slide.firebaseio.com',
  projectId: 'one-slide',
  storageBucket: 'one-slide.appspot.com',
  messagingSenderId: '239403079840',
};
const app = firebase.initializeApp(config);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.prototype.$auth = app.auth();
Vue.prototype.$store = store;
Vue.prototype.$db = firebase.firestore();
//  Vue.prototype.$router = router;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  mounted() {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        store.commit('setUser', user);
        // alert('aww snap');
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
  },
});
