<script setup lang="ts">
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
import BookStoreHolder from "@/components/Card/BookStoreHolder.vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";

import "@/assets/swiperBook.css";

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
const modules = [Pagination];
</script>

<template>
  <div class="h-ch100vh w-full container">
    <div class="h-ch100vh w-full">
      <RouterLink
        to="/Book"
        @click="clearLocalStorageBook"
        class="flex items-center gap-2"
      >
        <FontAwesomeIcon :icon="['fas', 'arrow-left']" class="cursor-pointer" />
        <span>Back to page</span>
      </RouterLink>
      <div class="flex flex-col h-max w-full py-5">
        <!-- Image  -->
        <div class="flex gap-4 h-max w-full py-4">
          <img
            class="h-max w-max object-contain"
            :src="useBook.book.bookImage"
            alt="Book Image"
          />
          <div
            class="flex flex-col gap-2 p-5 rounded-md h-96 w-rem40 shadow-md bg-slate-100 max-h-96 overflow-y-auto"
          >
            <div class="flex items-center gap-4">
              <p class="font-bold text-lg">{{ useBook.book.title }}</p>
              <p>
                by <span class="font-bold">{{ useBook.book.author }}</span>
              </p>
            </div>

            <!-- Book Description -->
            <div>
              <p class="font-bold">Description:</p>
              <p class="text-justify">{{ useBook.book.description }}</p>
            </div>

            <div class="border-0.5px border-slate-200"></div>

            <!-- Book Ratings -->

            <div class="">
              <p class="font-bold">Reviews:</p>
              <p class="text-justify">{{ useBook.book.ratingsReview }}</p>
            </div>

            <div v-if="editionExists">
              <p class="w-max flex items-center gap-1">
                <span class="font-bold">Edition:</span
                >{{ useBook.book.edition }}
              </p>
              <p class="w-max flex items-center gap-1">
                <span class="font-bold">Publisher:</span
                >{{ useBook.book.publisher }}
              </p>
              <p class="w-max flex items-center gap-1">
                <span class="font-bold">Publication Date:</span
                >{{ useBook.book.publicationDate }}
              </p>
              <p class="w-max flex items-center gap-1">
                <span class="font-bold">Category:</span
                >{{ useBook.book.category }}
              </p>
              <p class="w-max flex items-center gap-1">
                <span class="font-bold">Genre:</span>{{ useBook.book.genre }}
              </p>
            </div>

            <div v-else></div>
          </div>

          <!-- Price -->
          <div
            class="flex flex-col justify-center gap-2 w-96 h-96 shadow-md bg-slate-100 p-5"
          >
            <p class="font-bold text-2xl">RM {{ useBook.book.price }}</p>
            <div>
              <p class="w-max flex items-center gap-1">
                <span class="font-bold">ISBN:</span>{{ useBook.book.isbn }}
              </p>
              <p class="w-max flex items-center gap-1">
                <span class="font-bold">Stock Status:</span
                >{{ useBook.book.status }}
              </p>
              <p class="w-max flex items-center gap-1">
                <span class="font-bold">Stock Quantity:</span
                >{{ useBook.book.stockQuantity }}
              </p>
            </div>
            <div>
              <NumberField id="age" :default-value="0" :min="0">
                <Label for="age">Quantity</Label>
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
            </div>

            <div class="flex flex-col gap-2">
              <Button
                >Add to Cart <i class="fas fa-shopping-cart cursor-pointer"></i
              ></Button>
              <RouterLink :to="`/shoppingCart/${bookId}`" class="flex w-full">
                <Button class="w-full">Buy Now</Button>
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Other Books -->
        <div class="flex w-full h-full"></div>
      </div>
    </div>
  </div>
</template>
