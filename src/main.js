import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import './element-variables.scss'
import router from './router'
import * as firebase from "firebase/app";

/* code from our Firebase console */
const firebaseConfig = {
  apiKey: "AIzaSyAwMK5t4rvCI_WadLR9egNgSlpOdMDREDU",
  authDomain: "sad-project-4089f.firebaseapp.com",
  projectId: "sad-project-4089f",
  storageBucket: "sad-project-4089f.appspot.com",
  messagingSenderId: "878782521598",
  appId: "1:878782521598:web:6f1ab3a5db5f9a81fb85af",
  measurementId: "G-1DJE4Z1X3K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)

installElementPlus(app)
app.mount('#app')