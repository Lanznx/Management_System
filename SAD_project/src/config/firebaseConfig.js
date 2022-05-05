import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyAwMK5t4rvCI_WadLR9egNgSlpOdMDREDU",
  authDomain: "sad-project-4089f.firebaseapp.com",
  databaseURL: "https://sad-project-4089f-default-rtdb.firebaseio.com",
  projectId: "sad-project-4089f",
  storageBucket: "sad-project-4089f.appspot.com",
  messagingSenderId: "878782521598",
  appId: "1:878782521598:web:6f1ab3a5db5f9a81fb85af",
  measurementId: "G-1DJE4Z1X3K"
};


const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp