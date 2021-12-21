import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from './router'

import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyAwMK5t4rvCI_WadLR9egNgSlpOdMDREDU",
    authDomain: "sad-project-4089f.firebaseapp.com",
    projectId: "sad-project-4089f",
    storageBucket: "sad-project-4089f.appspot.com",
    messagingSenderId: "878782521598",
    appId: "1:878782521598:web:6f1ab3a5db5f9a81fb85af",
    measurementId: "G-1DJE4Z1X3K"
};

const firebaseApp = initializeApp(firebaseConfig)

let app

import { getAuth, onAuthStateChanged } from 'firebase/auth'
onAuthStateChanged(getAuth(), (_user) => {
    if (!app) { // logged in
        app = createApp(App)
        app.config.globalProperties.firebase_user = _user
        app.use(router).use(ElementPlus).mount('#app')
    }else if(_user != null){
        app.config.globalProperties.firebase_user = _user
    }
})

export default { firebaseApp }