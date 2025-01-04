<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-icons/vue";
import { Button } from "@/components/ui/button";

import { RouterLink } from "vue-router";
</script>

<template>
  <div
    class="flex flex-col gap-4 border-2 h-full py-5 shadow-2xl bg-slate-100 rounded-md"
  >
    <!-- Book List -->
    <div class="container flex items-center justify-between">
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
            <Button variant="green"
              ><RouterLink to="/admin/AddBook">Add Book</RouterLink>
            </Button>
          </div>
        </div>
        <Button variant="red">Delete Book </Button>
      </div>
    </div>

    <!-- =========== DISPLAY EXISTING BOOKS ========== -->
    <div class="flex items-center justify-center h-ch80vh w-full">
      <div class="h-full w-full"></div>
    </div>
  </div>
</template>
