<script setup lang="ts">
import IconInsta from "../icons/IconInsta.vue";
import IconFaceBook from "../icons/IconFaceBook.vue";
import IconPinterest from "../icons/IconPinterest.vue";
</script>

<template>
  <footer class="container mx-auto bg-white py-8 border-t border-gray-400">
    <div class="container flex px-3 py-8">
      <div class="w-full mx-auto flex flex-wrap">
        <div class="flex w-full lg:w-1/2">
          <div class="px-3 md:px-0">
            <h3 class="font-bold text-gray-900">About</h3>
            <p class="py-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              vel mi ut felis tempus commodo nec id erat. Suspendisse
              consectetur dapibus velit ut lacinia.
            </p>
          </div>
        </div>
        <div
          class="flex w-full lg:w-1/2 lg:justify-end lg:text-right mt-6 md:mt-0"
        >
          <div class="px-3 md:px-0">
            <h3 class="text-left font-bold text-gray-900">Social</h3>

            <div class="w-full flex items-center py-4 mt-0">
              <a href="#" class="mx-2"> </a>
              <a href="#" class="mx-2">
                <IconFaceBook />
              </a>
              <a href="#" class="mx-2">
                <IconInsta />
              </a>
              <a href="#" class="mx-2"> <IconPinterest /> </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
