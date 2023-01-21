<template>
  <div class="px-14">
    <div class="container mx-auto mt-12">
      <h1 class="font-black text-4xl mb-10">Create New Link</h1>
      <div>
        <form>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-xl font-bold mb-2"
              for="title"
            >
              Title
            </label>
            <input
              v-model="title"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-xl font-bold mb-2"
              for="destination"
            >
              Destination
            </label>
            <input
              v-model="destination"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="destination"
              type="text"
              placeholder="www.my_long_url.com"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-xl font-bold mb-2"
              for="destination"
            >
              Short Link
            </label>
            <label class="text-md">
              localhost:5173/to/
              <input
                v-model="shortLink"
                class="shadow appearance-none border rounded py-2 px-3 w-1/3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="destination"
                type="text"
                placeholder="Custom back-half (optional)"
              />
            </label>
          </div>

          <button
            class="bg-blue-700 rounded-md font-bold text-white text-lg hover:bg-blue-800 px-8 py-2"
            @click.prevent="addLink"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "CreateLink",

  data: () => ({
    title: "",
    destination: "",
    shortLink: "",
  }),

  methods: {
    async addLink() {
      const randomCode = Math.random().toString(36).substring(7);
      const data = {
        title: this.title,
        destination: this.destination,
        shortLink: this.shortLink || randomCode,
      };

      await axios
        .post(`http://127.0.0.1:3000/add`, data)
        .then(() => this.$router.go("/dashboard"));
    },
  },
};
</script>
