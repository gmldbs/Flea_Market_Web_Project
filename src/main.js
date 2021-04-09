import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/style.scss';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import VueFirestore from 'vue-firestore'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueChatScroll from 'vue-chat-scroll'
import vueMoment from 'vue-moment' 
// global components
import GlobalComponents from './globalComponents'
import VueSidebarMenu from 'vue-sidebar-menu'

var firebaseConfig = {
   "apiKey": "AIzaSyBh08GxpCd7xivvLWzJfaO7n7PNAT1lztk",
   "authDomain": "web-project-4f3bd.firebaseapp.com",
   "databaseURL": "https://web-project-4f3bd.firebaseio.com",
   "projectId": "web-project-4f3bd",
   "storageBucket": "web-project-4f3bd.appspot.com",
   "messagingSenderId": "899216227195",
   "appId": "1:899216227195:web:af27c95f4391e52aaa5bde",
   "measurementId": "G-S4W2C7RG2J"
};
firebase.initializeApp(firebaseConfig);
Vue.use(GlobalComponents);
Vue.use(VueFirestore)
Vue.use(Vuetify);
Vue.use(VueChatScroll)
Vue.use(VueSidebarMenu)
Vue.use(vueMoment)
Vue.prototype.$database = firebase.firestore()
Vue.prototype.$fireStorage = firebase.storage()
router.afterEach(() => {
   const contentWrapper = document.querySelector(".v-content__wrap");
   if(contentWrapper !== null){
		contentWrapper.scrollTop = 0;
		window.scroll(0,0);
   }
})


Vue.config.productionTip = false
new Vue({
   vuetify: new Vuetify(),
   router,
   store,
   render: h => h(App)
}).$mount('#app')
