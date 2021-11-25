<template>
  <router-view />
</template>

<script setup>
  import { ref } from 'vue' // used for conditional rendering
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  //import { useRouter } from 'vue-router'
  //const router = useRouter()
  const isLoggedIn = ref(true)

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(uid)
      isLoggedIn.value = true // if we have a user
    } else {
      // User is signed out
      isLoggedIn.value = false // if we do not
    }
  });

  /*const logOut = () => {
    signOut(auth).then(() => {
      router.push("/")
    }).catch((error) => {
      console.log(error)
    });
  }*/

</script>

<style>
  body {margin:0;padding:0}
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
