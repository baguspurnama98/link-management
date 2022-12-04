<template>
  <div>
    <div class="text-3xl font-bold underline my-7">
      <router-link to="/"> Welcome! Shortlink Apps</router-link>
    </div>
    <h1 class="font-bold text-xl">Jumlah Link Aktif: {{ totalLink }}</h1>

    <div class="my-5">
      <router-link to="/login" class="bg-blue-400 p-2 rounded-md text-black"
        >Login</router-link
      >
      <router-link
        to="/register"
        class="bg-yellow-400 p-2 rounded-md text-black"
        >Register</router-link
      >
    </div>
  </div>
</template>

<script>
import { database } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export default {
  name: "Main",

  data: () => ({
    arrayShopping: [],
    totalLink: 0,
  }),

  mounted() {
    onSnapshot(collection(database, "links"), (querySnapshot) => {
      this.totalLink = querySnapshot.size;
    });
  },
};
</script>
