<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import { useToast } from "@/components/ui/toast/use-toast";
import { RouterLink } from "vue-router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import router from "@/router";

const { toast } = useToast();

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../assets/style.css";

// import required modules
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
const modules = [Pagination, Autoplay];

const showPassword = ref(false);
const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

// Pinia store
// import { useAuthStore } from "@/stores/authStore";
// const authStore = useAuthStore();
// const username = ref(null);

// ====== Login =======
const data = ref({
  username: "",
  password: "",
});

const login = async () => {
  try {
    const form = {
      username: data.value.username,
      password: data.value.password,
    };

    if (form.username === " " || form.password === " ") {
      toast({
        title: "Empty Form",
        description: "Please fill in the username and password",
      });
    }

    const response = await axios.post("http://127.0.0.1:8000/api/login", {
      headers: {
        Accept: "application/json",
      },
      ...form,
    });
    const { token } = response.data as { token: string }; // Type assertion

    // authStore().setToken(token);
    // authStore().setUser(form.username);
    router.push("/");
  } catch (err) {
    // Object Entries allow to display dynamic error message
    Object.entries(err.response.data.errors).forEach(
      ([errorName, errorMessage]) => {
        toast({
          title: "Login Failed!",
          description: `${errorMessage}`,
          variant: "destructive",
        });
      }
    );
  }
};
</script>

<template>
  <div class="w-full h-ch80vh flex items-center justify-center">
    <div class="flex items-center justify-center w-max shadow-2xl">
      <div class="h-96 w-96 max-w-96 max-h-96">
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

      <!-- ===================== LOGIN ===================== -->
      <div class="h-96 py-5 px-5 w-80 max-w-80">
        <div class="text-black font-bold text-3xl mb-5">Login</div>
        <form class="h-40 flex flex-col gap-2">
          <!-- ============= Username FormField ============= -->

          <FormField v-slot="{ componentField }" name="username">
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
                />
                <ErrorMessage name="username" />
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

        <div class="flex flex-col gap-4 h-max mt-3">
          <div class="flex items-center gap-10">
            <Button type="submit" @click="login()">Button</Button>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Login page" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup class="flex flex-col gap-2">
                  <RouterLink to="/Login">Buyer Login</RouterLink>

                  <RouterLink to="/seller">Seller Login</RouterLink>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="flex flex-col items-center">
            <RouterLink to="/forgotpassword">
              <span
                class="hover:underline hover:cursor-pointer hover:text-sky-500 text-0.7rem font-bold"
                >Forgot Password?</span
              ></RouterLink
            >
            <RouterLink to="/Signup"
              ><span
                class="hover:underline hover:cursor-pointer hover:text-sky-500 text-0.7rem font-bold"
                >Don't have an account?</span
              ></RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
