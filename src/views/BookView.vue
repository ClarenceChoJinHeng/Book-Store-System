<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-icons/vue";
import BookStoreHolder from "@/components/Card/BookStoreHolder.vue";

import { bookStore } from "@/stores/book";
import { ref, computed } from "vue";

const book = bookStore();
const books = computed(() => book.books);
</script>

<template>
  <div class="flex flex-col gap-2 container h-max pt-2">
    <div class="flex items-center gap-2">
      <Select>
        <SelectTrigger class="w-[180px] border-2 border-black bg-none">
          <SelectValue
            class="font-bold text-black"
            placeholder="Filter Books"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple"> Apple </SelectItem>
            <SelectItem value="banana"> Banana </SelectItem>
            <SelectItem value="blueberry"> Blueberry </SelectItem>
            <SelectItem value="grapes"> Grapes </SelectItem>
            <SelectItem value="pineapple"> Pineapple </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <!-- Search Bar   -->
      <div class="relative w-full max-w-sm items-center">
        <Input id="search" type="text" placeholder="Search..." class="pl-10" />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
        >
          <MagnifyingGlassIcon class="size-6 text-muted-foreground" />
        </span>
      </div>
    </div>
    <!-- Books -->  
    <div class="flex w-full h-full">
      <div class="flex gap-5 flex-wrap w-max items-center max-w-max">
        <BookStoreHolder
          v-for="book in books"
          :id="book.id"
          :imageUrl="book.bookImage"
          :title="book.title"
          :author="book.author"
          :price="book.price"
        />
      </div>
    </div>
  </div>
</template>
