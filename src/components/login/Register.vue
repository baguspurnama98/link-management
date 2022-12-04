<template>
  <div>
    <div class="text-3xl font-bold underline my-7">
      <router-link to="/"> Welcome! Shorlink Apps</router-link>
    </div>
    <div class="text-3xl font-bold underline my-7">Register Shorlink Apps</div>

    <form class="" @submit.prevent="handleSubmit">
      <label>
        Email:
        <input v-model="email" placeholder="Email" type="text" class="border" />
      </label>
      <label>
        Password:
        <input
          v-model="password"
          placeholder="Password"
          type="password"
          class="border"
        />
      </label>
      <button type="submit" class="p-2 bg-green-500 rounded-md mx-3">
        Daftar
      </button>
    </form>
    <div v-if="isSuccess != null">
      <h1 v-if="isSuccess === true">Berhasil Mendaftar</h1>
      <h1 v-if="isSuccess === false">Gagal Mendaftar</h1>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Register",

  data() {
    return {
      email: "",
      password: "",
      token: undefined,
    };
  },

  methods: {
    async handleSubmit() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          alert("Successfully registered! Please login.");
          this.token = userCredential._tokenResponse;
          this.$router.push("/login");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
