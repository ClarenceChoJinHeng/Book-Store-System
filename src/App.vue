<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import Navbar from "./components/Card/Navbar.vue";
import Footer from "./components/Card/Footer.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
import AdminSidebar from "@/components/Card/AdminSidebar.vue";

import { computed } from "vue";

const route = useRoute();
const showFooter = computed(() => !route.meta.hideFooter);
const hideHeader = computed(() => !route.meta.hideHeader);
const hideAdmin = computed(() => route.meta.hideAdmin);
</script>

<template>
  <div>
    <AdminSidebar v-if="hideAdmin" />
    <div v-else class="flex flex-col min-h-ch100vh">
      <Navbar v-if="!hideHeader" />
      <div class="">
        <RouterView />
        <Toaster />
      </div>
      <Footer v-if="showFooter" />
    </div>
  </div>
</template>
