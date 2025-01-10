<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const route = useRoute();
</script>

<template>
  <div class="bg-gray-100 font-family-karla flex">
    <div class="relative bg-white text-black h-screen w-64 shadow-xl">
      <div class="p-6">
        <div>
          <p class="text-bold text-3xl font-bold">Admin</p>
        </div>
      </div>
      <nav class="text-base font-semibold pt-3">
        <div>
          <RouterLink
            to="/admin/dashboard"
            :class="{
              'flex items-center py-4 pl-6': true,
              'bg-gray-200': route.path === '/admin/dashboard',
            }"
          >
            <i class="fas fa-tachometer-alt mr-3"></i>
            Dashboard
          </RouterLink>
        </div>
        <div>
          <RouterLink
            to="/admin/author/author-manage"
            :class="{
              'flex items-center hover:opacity-100 py-4 pl-6': true,
              'bg-gray-200': route.path === '/admin/author/author-manage',
            }"
          >
            <i class="fas fa-user mr-3"></i>
            Author List
          </RouterLink>
        </div>
        <div>
          <RouterLink
            to="/admin/book/book-manage"
            :class="{
              'flex items-center hover:opacity-100 py-4 pl-6': true,
              'bg-gray-200': route.path === '/admin/book/book-manage',
            }"
          >
            <i class="fas fa-book mr-3"></i>
            Book List
          </RouterLink>
        </div>

        <div>
          <RouterLink
            to="/admin/users-manage"
            :class="{
              'flex items-center hover:opacity-100 py-4 pl-6': true,
              'bg-gray-200': route.path === '/admin/users-manage',
            }"
          >
            <i class="fas fa-user mr-3"></i>
            User Management
          </RouterLink>
        </div>
      </nav>
    </div>

    <div class="w-full flex flex-col h-screen overflow-y-hidden">
      <!-- Desktop Header -->
      <header class="w-full bg-white py-2 px-6 flex flex-end">
        <div class="w-full"></div>
        <div class="relative w-max flex shadow-md rounded-full">
          <Avatar>
            <!-- <AvatarImage /> -->
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main class="flex-1 overflow-y-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
