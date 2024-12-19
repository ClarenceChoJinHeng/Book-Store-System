<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import Navbar from "./components/Card/Navbar.vue";
import Footer from "./components/Card/Footer.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
import { computed } from "vue";

const route = useRoute();
const showFooter = computed(() => !route.meta.hideFooter);
</script>

<template>
  <Navbar />
  <RouterView />
  <Toaster />
  <Footer v-if="showFooter" />
</template>
