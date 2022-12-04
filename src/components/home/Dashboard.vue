<template>
  <div>
    <div class="text-3xl font-bold underline my-7">
      <router-link to="/"> Welcome! Shorlink Apps</router-link>
    </div>
    <div>
      <form>
        <label>
          Tambah Link:
          <input
            v-model="newLink"
            placeholder="Masukan Link"
            type="text"
            class="border p-2"
          />
        </label>
        <button
          class="p-2 bg-green-500 ml-4 rounded-md"
          @click.prevent="addLink"
        >
          Tambah
        </button>
      </form>
    </div>
    <div class="mt-5">
      <table class="table-auto border-collapse border border-slate-500">
        <thead>
          <th class="border border-slate-600">No.</th>
          <th class="border border-slate-600">Link</th>
          <th class="border border-slate-600">Shorted Link</th>
          <th class="border border-slate-600">Action</th>
        </thead>
        <tbody>
          <tr v-for="(link, index) in listLink">
            <td class="border border-slate-600" v>{{ index + 1 }}</td>
            <td class="border border-slate-600">
              <input
                v-model="link.data.link"
                class="border p-2 mx-1 bg-gray-100 rounded-xl"
              />
            </td>
            <td class="border border-slate-600">
              bit.ly/<input
                v-model="link.data.shorted"
                class="border p-2 mx-1 bg-gray-100 rounded-xl"
              />
            </td>
            <td class="border border-slate-600">
              <button
                class="p-1 bg-blue-500 rounded-lg"
                @click.prevent="saveEdit(index)"
              >
                Edit
              </button>
              <button
                class="p-1 bg-red-500 rounded-lg"
                @click.prevent="deleteLink(link.id)"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { database } from "../../firebase/config";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

export default {
  name: "Dashboar",

  data: () => ({
    listLink: [],
    totalLink: 0,
    newLink: "",
  }),

  mounted() {
    onSnapshot(collection(database, "links"), (querySnapshot) => {
      const temp = [];
      this.totalLink = querySnapshot.size;
      querySnapshot.forEach((doc) => {
        temp.push({ id: doc.id, data: doc.data() });
      });
      console.log(temp);

      this.listLink = temp;
    });
  },

  methods: {
    async addLink() {
      const randomCode = Math.random().toString(36).substring(7);
      // console.log(randomCode, this.newLink);
      try {
        const docRef = await addDoc(collection(database, "links"), {
          link: this.newLink,
          shorted: randomCode,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },

    async deleteLink(idDoc) {
      await deleteDoc(doc(collection(database, "links"), idDoc));
    },

    async saveEdit(idx) {
      console.log(this.listLink[idx]);
      await updateDoc(doc(database, "links", this.listLink[idx].id), {
        link: this.listLink[idx].data.link,
        shorted: this.listLink[idx].data.shorted,
      });
    },
  },
};
</script>
