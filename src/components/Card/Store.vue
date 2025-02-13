<script setup lang="ts">
import BookHolder from "./BookHolder.vue";
import IconArrow from "@/components/icons/IconArrow.vue";
import { bookStore } from "@/stores/book";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const book = bookStore();
const selectedCategory = ref("Fiction");
const books = computed(() => book.books);
const filteredBooks = computed(() => {
  return book.books.filter((b) => b.category === selectedCategory.value);
});
</script>
<template>
  <section class="bg-white py-8 flex justify-center">
    <div
      class="container mx-4 flex items-center justify-center flex-col pt-4 pb-12 max-w-full w-full gap-5"
    >
      <div
        class="container mx-4 flex items-center justify-center flex-col pt-4 pb-12 w-full max-w-full"
      >
        <nav id="store" class="w-full z-30 top-0 px-6 py-1">
          <div
            class="w-full mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3"
          >
            <p
              class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
            >
              Books to Explore
            </p>

            <hr />

            <div class="flex items-center" id="store-nav-content">
              <!-- Dropdown -->

              <div>
                <RouterLink
                  to="/BuyBooks"
                  class="flex items-center justify-center gap-2"
                  >See More <IconArrow
                /></RouterLink>
              </div>
            </div>
          </div>
        </nav>

        <!-- Books To Explore  -->

        <Carousel
          class="w-full"
          :opts="{
            align: 'start',
          }"
        >
          <CarouselContent>
            <BookHolder
              v-for="book in books"
              :key="book.id"
              :imageUrl="book.bookImage"
              :title="book.title"
              :author="book.author"
              :price="book.price"
            />
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div
        class="container mx-4 flex items-center justify-center flex-col pt-4 pb-12 w-full max-w-full"
      >
        <!-- Various Book to Explore  -->
        <nav id="store" class="w-full z-30 top-0 px-6 py-1">
          <div
            class="w-full mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3"
          >
            <p
              class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
            >
              Explore Various Romance and Historical Fiction Books
            </p>

            <hr />

            <div class="flex items-center" id="store-nav-content">
              <!-- Dropdown -->

              <div>
                <RouterLink
                  to="/books"
                  class="flex items-center justify-center gap-2"
                  >See More <IconArrow
                /></RouterLink>
              </div>
            </div>
          </div>
        </nav>

        <!-- Explore Various Romance and Historical Fiction Books -->

        <Carousel
          class="w-full"
          :opts="{
            align: 'start',
          }"
        >
          <CarouselContent>
            <BookHolder
              v-for="(book, index) in filteredBooks"
              :key="index"
              :imageUrl="book.bookImage"
              :author="book.author"
              :title="book.title"
              :price="book.price"
            />
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div
        class="container mx-4 flex items-center justify-center flex-col pt-4 pb-12 w-full max-w-full"
      >
        <!-- Top Trending Book to Explore  -->
        <nav id="store" class="w-full z-30 top-0 px-6 py-1">
          <div
            class="w-full mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3"
          >
            <p
              class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
            >
              Explore Amazon most Trending Books
            </p>

            <hr />

            <div class="flex items-center" id="store-nav-content">
              <!-- Dropdown -->

              <div>
                <RouterLink
                  to="/BuyBooks"
                  class="flex items-center justify-center gap-2"
                  >See More <IconArrow
                /></RouterLink>
              </div>
            </div>
          </div>
        </nav>

        <!-- Trending Books To Explore  -->

        <Carousel
          class="w-full"
          :opts="{
            align: 'start',
          }"
        >
          <CarouselContent>
            <BookHolder
              v-for="(book, index) in books"
              :key="index"
              :imageUrl="book.bookImage"
              :author="book.author"
              :title="book.title"
              :price="book.price"
            />
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  </section>
</template>
