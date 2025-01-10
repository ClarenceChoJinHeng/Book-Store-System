<script setup lang="ts">
import AuthorTable from "@/components/Card/AuthorTable.vue";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-icons/vue";
import { Button } from "@/components/ui/button";
import { useAuthorStore } from "@/stores/author.ts";
import { RouterLink } from "vue-router";
const authors = useAuthorStore();
</script>

<template>
  <div
    class="flex flex-col gap-4 border-2 h-max rounded-md pt-4 shadow-md bg-slate-100"
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
            <RouterLink to="/admin/author/add-author">
              <Button variant="green">Add author </Button></RouterLink
            >
          </div>
        </div>
      </div>
    </div>

    <!-- =========== DISPLAY EXISTING BOOKS ========== -->
    <div class="flex items-center justify-center h-max w-full">
      <div class="h-full w-full">
        <AuthorTable />
      </div>
    </div>
  </div>
</template>
