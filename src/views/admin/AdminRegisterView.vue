<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ref, computed } from "vue";
import { useAdminStore } from "@/stores/admin.ts";

const admin = useAdminStore();

const showPassword = ref(false);

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const data = {
  username: "",
  email: "",
  password: "",
};
</script>

<template>
  <div class="flex items-center justify-center h-ch90vh w-cw90r bg-slate-white">
    <div class="flex h-ch30r w-rem30 shadow-2xl">
      <!-- ===================== SIGNUP ===================== -->
      <div class="flex flex-col h-full py-5 px-5 w-full container">
        <div class="text-black font-bold text-3xl mb-5">Admin Signup</div>
        <form class="h-max flex flex-col gap-1">
          <!-- ============= Username FormField ============= -->

          <FormField name="username">
            <FormItem>
              <FormLabel class="text-black font-bold text-base"
                >Username</FormLabel
              >

              <FormControl class="flex">
                <Input
                  type="text"
                  v-model="data.username"
                  placeholder="Username"
                  class="border-1px border-black px-1 py-1 rounded-2px w-full"
                  ref="username"
                />
              </FormControl>
            </FormItem>
          </FormField>

          <!-- ============= Email FormField ============= -->

          <FormField name="email">
            <FormItem>
              <FormLabel class="text-black font-bold text-base"
                >Email</FormLabel
              >
              <FormControl class="flex">
                <Input
                  type="email"
                  v-model="data.email"
                  placeholder="Email"
                  class="border-1px border-black px-1 py-1 rounded-2px w-full"
                />
              </FormControl>
            </FormItem>
          </FormField>

          <!-- ============= Password FormField ============= -->

          <FormField name="password">
            <FormItem>
              <FormLabel class="text-black font-bold text-base"
                >Password</FormLabel
              >
              <FormControl>
                <div class="flex items-center justify-center relative">
                  <Input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="data.password"
                    placeholder="Password"
                    class="border-1px border-black px-1 py-1 rounded-2px w-full"
                  />
                  <i
                    class="fas absolute right-3 hover:cursor-pointer"
                    :class="{
                      'fa-eye-slash': showPassword,
                      'fa-eye': !showPassword,
                    }"
                    @click="toggleShowPassword"
                  ></i>
                </div>
              </FormControl>
            </FormItem>
          </FormField>
        </form>
        <!-- ============== Router Link ===============  -->

        <div class="flex flex-col gap-3">
          <div class="flex flex-col items-center gap-4 h-12 mt-3">
            <!-- ============== Submit Button ===============  -->

            <Button
              type="submit"
              class="w-full"
              @click="
                admin.adminRegister(data.username, data.email, data.password)
              "
              >Sign Up</Button
            >
            <div class="flex flex-col items-center gap-2">
              <RouterLink to="/admin/login"
                ><span
                  class="hover:underline hover:cursor-pointer hover:text-sky-500 text-sm font-bold"
                  >Already Have an Account?</span
                ></RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Ensure Font Awesome is included */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
</style>
