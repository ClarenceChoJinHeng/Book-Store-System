<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-icons/vue";
import { Button } from "@/components/ui/button";

import { RouterLink } from "vue-router";

import BookTable from "@/components/Card/BookTable.vue";
</script>

<template>
  <div
    class="flex flex-col gap-4 border-2 h-max py-5 shadow-md bg-slate-100 rounded-md"
  >
    <!-- Book List -->
    <div class="px-4 flex items-center justify-between w-full">
      <div class="relative w-full max-w-sm items-center">
        <Input id="search" type="text" placeholder="Search..." class="pl-10" />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
        >
          <MagnifyingGlassIcon class="size-6 text-muted-foreground" />
        </span>
      </div>
      <div class="flex gap-1 cursor-pointer">
        <!-- ================== Button ================== -->
        <div class="">
          <div>
            <RouterLink to="/admin/book/add-book"
              ><Button variant="green">Add Book </Button></RouterLink
            >
          </div>
        </div>
      </div>
    </div>

    <!-- =========== DISPLAY EXISTING BOOKS ========== -->
    <div class="flex items-center h-max w-full">
      <div class="h-full w-full">
        <BookTable />
      </div>
    </div>
  </div>
</template>
