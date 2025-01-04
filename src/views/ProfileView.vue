<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import Sidebar from "@/components/Card/Sidebar.vue";

const authStore = useAuthStore();

// const logout = async () => {
//   await authStore.logout();
// };
</script>

<template>
  <div>
    <Sidebar/>
    Testing
    <Button variant="red" @click="authStore.logout()"> Logout </Button>
  </div>
</template>
