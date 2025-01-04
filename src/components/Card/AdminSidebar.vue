<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
</script>

<template>
  <div class="bg-gray-100 font-family-karla flex">
    <div class="relative bg-white text-black h-screen w-64 shadow-xl">
      <div class="p-6">
        <a
          href="index.html"
          class="text-3xl font-semibold uppercase hover:text-gray-300"
          >Admin</a
        >
      </div>
      <nav class="text-base font-semibold pt-3">
        <RouterLink to="/Dashboard" class="flex items-center py-4 pl-6">
          <i class="fas fa-tachometer-alt mr-3"></i>
          Dashboard
        </RouterLink>
        <RouterLink to="/admin/book-manage" class="flex items-center py-4 pl-6">
          <i class="fas fa-book mr-3"></i>
          Book List
        </RouterLink>

        <RouterLink
          to="/Author"
          class="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
        >
          <i class="fas fa-user mr-3"></i>
          Author List
        </RouterLink>

        <RouterLink
          to="/Users"
          class="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
        >
          <i class="fas fa-user mr-3"></i>
          User Management
        </RouterLink>
      </nav>
    </div>

    <div class="w-full flex flex-col h-screen overflow-y-hidden">
      <!-- Desktop Header -->
      <header class="w-full bg-white py-2 px-6 flex flex-end">
        <div class="w-full"></div>
        <div class="relative w-max flex shadow-md rounded-full">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main class="flex-1 overflow-y-auto p-6">\
        
        <RouterView />
      </main>
    </div>
  </div>
</template>
