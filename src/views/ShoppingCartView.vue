<script setup lang="ts">
import { Checkbox } from "@/components/ui/checkbox";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Button } from "@/components/ui/button";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Label } from "@/components/ui/label";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
// Register the icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { useRoute } from "vue-router";
import { bookStore } from "@/stores/book";
import { computed, onMounted, ref } from "vue";
library.add(faArrowLeft);

const route = useRoute();

const bookId = route.params.id;
const useBook = bookStore();
const selectedBook = ref(null);
onMounted(async () => {
  selectedBook.value = await useBook.getBookById(Number(bookId));
});
// const singleBook = computed(() => useBook.book);

const clearLocalStorageBook = () => {
  localStorage.removeItem("book");
};

const editionExists = computed(() => {
  return useBook.book.edition ? true : false;
});
</script>

<template>
  <div class="container h-ch100vh w-full">
    <div class="flex flex-col gap-5 p-5 border-2 border-black h-ch80vh">
      <h1 class="font-bold text-2xl">The Book | Shopping Cart</h1>
      <RouterLink
        :to="`/singleBook/${useBook.book.id}`"
        @click="clearLocalStorageBook"
        class="flex items-center gap-2"
      >
        <FontAwesomeIcon :icon="['fas', 'arrow-left']" class="cursor-pointer" />
        <span>Back to page</span>
      </RouterLink>

      <!-- Cart -->
      <div
        class="flex items-center p-5 w-full gap-2 bg-slate-100 shadow-md h-max rounded-md"
      >
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <Checkbox id="terms" />
            <label
              for="terms"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
          <div>
            <img
              class="h-max w-max object-contain"
              :src="useBook.book.bookImage"
              alt="Book Image"
            />
          </div>
        </div>
        <div class="flex justify-between w-full h-max">
          <div class="flex flex-col gap-15 items-center">
            <p class="font-bold text-xl">Unit Price:</p>
            <p class="font-bold text-xl">
              {{ useBook.book.price }}
            </p>
          </div>
          <div class="flex flex-col gap-15 items-center">
            <p class="font-bold text-xl">Quantity:</p>
            <p class="font-bold text-xl">
              {{ useBook.book.stockQuantity }}
            </p>
          </div>
          <div class="flex flex-col gap-15 items-center">
            <p class="font-bold text-xl">Total Price:</p>
            <p class="font-bold text-xl">{{}}</p>
          </div>
          <div class="flex flex-col gap-15 items-center">
            <p class="font-bold text-xl">Actions:</p>
            <Button variant="red">Delete</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
