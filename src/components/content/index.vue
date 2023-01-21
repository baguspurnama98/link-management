<script setup>
import { ref } from "vue";

const isOpen = ref(false);
</script>

<template>
  <div class="flex w-screen">
    <div
      :class="isOpen ? 'w-40' : 'w-80'"
      class="flex flex-col h-screen p-3 duration-300 bg-gray-50 shadow text-gray-700 sticky top-0"
    >
      <div class="space-y-3">
        <div class="text-center">
          <h2 class="text-2xl font-bold">Bagus Link Management</h2>
        </div>
        <div class="text-center">
          <button
            class="bg-blue-800 px-10 py-2 rounded-lg text-white font-black text-lg"
            @click="changePage('create')"
          >
            Create Link
          </button>
        </div>
        <div class="flex-1 text-md">
          <ul class="pt-2 pb-4 space-y-1">
            <li class="rounded-sm">
              <a
                @click="changePage('home')"
                class="flex items-center p-2 space-x-3 rounded-md cursor-pointer"
              >
                <HomeIcon />
                <span class="">Home</span>
              </a>
            </li>
            <li class="rounded-sm">
              <a
                @click="changePage('links')"
                class="flex items-center p-2 space-x-3 rounded-md cursor-pointer"
              >
                <LinksIcon />
                <span class="">Links</span>
              </a>
            </li>
            <li class="rounded-sm">
              <a
                @click="changePage('setting')"
                class="flex items-center p-2 space-x-3 rounded-md cursor-pointer"
              >
                <SettingIcon />
                <span class=""> Settings </span>
              </a>
            </li>
            <li class="rounded-sm">
              <a
                @click="changePage('logout')"
                class="flex items-center p-2 space-x-3 rounded-md cursor-pointer"
              >
                <LogoutIcon />

                <span class=""> Logout </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="page === 'home'" class="flex-auto">
      <Home :listLink="listLink" />
    </div>
    <div v-if="page === 'links'" class="flex-auto">
      <Links :listLink="listLink" :returnToForm="returnToForm" />
    </div>
    <div v-if="page === 'setting'" class="flex-auto">
      <Setting />
    </div>
    <div v-if="page === 'logout'" class="flex-auto">
      <Logout />
    </div>
    <div v-if="page === 'create'" class="flex-auto">
      <Create />
    </div>
  </div>
</template>

<script>
import HomeIcon from "../icons/Home.vue";
import LinksIcon from "../icons/Links.vue";
import LogoutIcon from "../icons/Logout.vue";
import SettingIcon from "../icons/Setting.vue";

import Home from "./Home.vue";
import Links from "./Links.vue";
import Setting from "./Setting.vue";
import Logout from "./Logout.vue";
import Create from "./CreateLink.vue";

import axios from "axios";

export default {
  name: "Dashboard",
  components: [Links, Setting, Logout, Home, Create],
  data: () => ({
    page: "home",
    listLink: [],
  }),
  mounted() {
    this.getAll();
  },
  methods: {
    async getAll() {
      await axios.get("http://127.0.0.1:3000/all").then((response) => {
        this.listLink = response.data;
        console.log(this.listLink);
      });
    },
    changePage(page) {
      console.log("Pindah ke", page);
      this.page = page;
      console.log(this.page);
    },
    returnToForm() {
      this.$nextTick(() => {
        this.page = "links";
      });

      console.log(this.page);
    },
  },

  //   computed: {

  //   }
};
</script>
