<template>
  <div class="px=10">
    <div class="container mx-auto mt-12">
      <div class="flex justify-between">
        <h1 class="font-black text-4xl mb-5">Links</h1>
        <button
          class="px-4 py-2 bg-green-400 hover:bg-green-500 rounded-lg font-bold"
          @click.prevent="changeToEdit"
        >
          Edit Mode {{ isEdit ? "On" : "Off" }}
        </button>
      </div>
      <div class="mt-5">
        <div class="mb-3 w-full" v-for="(link, index) in listLink">
          <div class="rounded-xl border p-5 shadow-md w-full bg-white">
            <div class="flex w-full items-center justify-between border-b pb-3">
              <div class="flex items-center space-x-3">
                <div class="text-2xl font-bold text-slate-700">
                  {{ link.title }}
                </div>
              </div>
              <div class="flex items-center space-x-8">
                <button
                  class="rounded-lg border bg-yellow-300 hover:bg-yellow-400 px-3 py-1 text-md font-bold"
                >
                  Edit
                </button>
                <button
                  class="rounded-lg border bg-red-500 hover:bg-red-600 px-3 py-1 text-md text-white font-bold"
                  @click.prevent="deleteLink(link.id)"
                >
                  Hapus
                </button>
                <!-- <div class="text-xs text-neutral-500">tanggal</div> -->
              </div>
            </div>

            <div class="my-2">
              <a
                v-if="isEdit === false"
                :href="`localhost:5173/to/${link.shortLink}`"
                target="_blank"
                class="mb-3 text-xl font-bold text-blue-700"
              >
                {{ `localhost:5173/to/${link.shortLink}` }}
              </a>
              <div class="text-sm text-black">
                <a
                  :href="`https://${link.destination}`"
                  target="_blank"
                  class="flex items-center p-2 space-x-3 text-lg rounded-md cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>

                  <span class="">{{ link.destination }}</span>
                </a>
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between text-slate-500">
                <div class="flex space-x-4 md:space-x-8">
                  <div
                    class="flex cursor-pointer items-center transition hover:text-slate-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                      />
                    </svg>

                    <span class="font-bold ml-2 text-normal">{{
                      link.clickCount
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateLink",

  props: ["listLink"],
  data: () => ({
    isEdit: false,
    localListLink: this.listLink || [],
  }),
  methods: {
    async deleteLink(idDoc) {
      await axios.delete(`http://127.0.0.1:3000/delete/${idDoc}`).then(() => {
        this.$router.go("/dashboard");
      });
    },
    changeToEdit() {
      this.isEdit = !this.isEdit;
    },
  },

  //   computed: {

  //   },

  //     async saveEdit(idDoc) {
  //         await axios
  //         .get(`http://127.0.0.1:3000/update/${idDoc}`, )
  //         .then((response) => console.log(response));
  //   },
};
</script>
