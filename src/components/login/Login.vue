<template>
  <div>
    <div class="text-3xl font-bold underline my-7">
      <router-link to="/"> Welcome! Shorlink Apps</router-link>
    </div>
    <div class="text-3xl font-bold underline my-7">Login Shorlink Apps</div>

    <form class="" @submit.prevent="login">
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
        Login
      </button>
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Login",

  data: () => ({
    email: "",
    password: "",
  }),

  // https://firebase.google.com/docs/auth/web/start?hl=en&authuser=0
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((a) => {
          alert("Successfully logged in");
          console.log(a);
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
