import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from './router'

import { initializeApp } from 'firebase/app'

import { firebaseConfig } from './firebaseConfig.js'

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