<script setup lang="ts">
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  author: String,
  price: Number,
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center max-w-max h-96 max-h-96"
  >
    <RouterLink :to="`/singleBook/${id}`">
      <div class="flex flex-col justify-center h-full max-w-48">
        <div class="flex items-center h-full justify-center">
          <img :src="imageUrl" alt="image" class="h-full object-cover" />
        </div>
        <div class="w-full">
          <p class="font-bold max-w-full truncate overflow-hidden">
            {{ title }}
          </p>
          <p class="truncate break-normal whitespace-normal"> 
            {{ author }}
          </p>
          <p class="pt-1 text-gray-900 truncate">RM {{ price }}</p>
        </div>
      </div></RouterLink
    >
  </div>
</template>
