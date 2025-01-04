<script setup lang="ts">
// Components for design from shadcn-vue and vue
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ref, computed } from "vue";
// Popup message Toast
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

// Routing pages
import { RouterLink } from "vue-router";
import router from "@/router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Front-end data send to backend
import axios from "axios";

// Import Swiper CSS
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../assets/style.css";
const modules = [Pagination, Autoplay];

// Import for input field form
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useAuthStore } from "../stores/authStore.ts";

const authStore = useAuthStore();

const showPassword = ref(false);

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const data = ref({
  username: "",
  email: "",
  password: "",
});
</script>

<template>
  <div class="flex items-center justify-center h-ch80vh w-full">
    <div class="flex items-center justify-center h-ch30r w-max shadow-2xl">
      <!-- ===================== SIGNUP ===================== -->
      <div class="flex flex-col items-center justify-center">
        <div class="h-full py-5 px-5 max-w-80 container">
          <div class="text-black font-bold text-3xl mb-5">Signup</div>
          <form class="h-max flex flex-col gap-1" @submit.prevent="signup">
            <!-- ============= Username FormField ============= -->

            <FormField v-slot="{ field }" name="username">
              <FormItem>
                <FormLabel class="text-black font-bold text-base"
                  >Username</FormLabel
                >

                <FormControl class="flex">
                  <Input
                    type="text"
                    placeholder="Username"
                    v-model="data.username"
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
                    v-model="data.email"
                    type="email"
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
                      v-model="data.password"
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="Password"
                      class="border-1px border-black px-1 py-1 rounded-2px"
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
            <div class="flex items-center gap-10 h-12 mt-3">
              <!-- ============== Submit Button ===============  -->

              <Button
                type="submit"
                @click="
                  authStore.signup(data.username, data.email, data.password)
                "
                >Sign Up</Button
              >
              <div class="flex flex-col items-center">
                <RouterLink to="/forgotpassword">
                  <span
                    class="hover:underline hover:cursor-pointer hover:text-sky-500 text-0.7rem font-bold"
                    >Forgot Password?</span
                  ></RouterLink
                >
                <RouterLink to="/Login"
                  ><span
                    class="hover:underline hover:cursor-pointer hover:text-sky-500 text-0.7rem font-bold"
                    >Already Have an Account?</span
                  ></RouterLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ===================== SWIPER =====================  -->
      <div class="h-full w-96 max-w-96">
        <swiper
          :pagination="{
            dynamicBullets: true,
          }"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
          }"
          :modules="[Pagination, Autoplay]"
          class="mySwiper"
        >
          <swiper-slide
            ><img
              src="../assets/DALLE_Why_People_Stop_Reading_1_1200x675.webp"
              alt="someone-reading-book"
          /></swiper-slide>
          <swiper-slide
            ><img
              src="../assets/Essential-Reading-2019-MAC-0475w.jpg"
              alt="someone-reading-book" /></swiper-slide
          ><swiper-slide
            ><img
              src="../assets/iStock-1495321240-1200x675.jpg"
              alt="someone-reading-book"
          /></swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<style>
/* Ensure Font Awesome is included */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
</style>
