<template>
  <div class="px-10">
    <div class="container mx-auto mt-12">
      <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
        <div class="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div class="text-sm font-medium text-gray-500 truncate">
            Total Links
          </div>
          <div class="mt-1 text-3xl font-semibold text-gray-900">
            {{ listLink.length || "Loading" }}
          </div>
        </div>
        <!-- <div class="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div class="text-sm font-medium text-gray-500 truncate">
            Total Users
          </div>
          <div class="mt-1 text-3xl font-semibold text-gray-900">$ 450k</div>
        </div> -->
        <div class="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div class="text-sm font-medium text-gray-500 truncate">
            Total Clicks
          </div>
          <div class="mt-1 text-3xl font-semibold text-gray-900">
            {{ countClick(listLink) || "Loading" }}
          </div>
        </div>
      </div>
    </div>
  </div>
  {{}}
</template>

<script>
export default {
  name: "Home",
  props: ["listLink"],

  methods: {
    countClick(arr) {
      let res = 0;
      arr.map((item) => (res += item.clickCount));
      return res;
    },
  },
};
</script>
