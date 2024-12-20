<script setup lang="ts">
import { Button } from "@/components/ui/button";
import Navbar from "./Card/Navbar.vue";
import { ref } from "vue";
import { useForm } from "vee-validate";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import { toTypedSchema } from "@vee-validate/zod";
import { useToast } from "@/components/ui/toast/use-toast";
import { Toaster } from "@/components/ui/toast";
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
const modules = [Pagination, Autoplay];

import * as z from "zod";

const formSchema = toTypedSchema(
  z.object({
    username: z
      .string()
      .min(2, "Username must be at least 2 characters")
      .max(50, "Username must be less than 50 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    username: "",
    password: "",
  },
});

const onSubmit = form.handleSubmit(
  (values) => {
    console.log("Form submitted!", values);
    toast({
      description: "Login Successful!",
    });
  },
  (errors) => {
    const errorMessages = Object.values(errors).flat().join(", ");
    toast({
      description: `Login unsuccessful: ${errorMessages}`,
    });
  }
);
</script>

<template>
  <div class="flex items-center justify-center max-h-96 shadow-2xl">
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

    <!-- ===================== SIGNUP ===================== -->
    <div class="h-96 py-5 px-5 w-80 max-w-80">
      <div class="text-black font-bold text-3xl mb-5">Login</div>
      <form @submit.prevent="onSubmit" class="h-40 flex flex-col gap-2">
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
                v-model="username"
                class="border-1px border-black px-1 py-1 rounded-2px w-full"
                ref="username"
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
            <FormControl class="flex">
              <Input
                v-model="password"
                type="password"
                placeholder="Password"
                class="border-1px border-black px-1 py-1 rounded-2px w-full"
              />
            </FormControl>
          </FormItem>
        </FormField>
      </form>
      <!-- ============== Router Link ===============  -->

      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-10">
          <Button>Button</Button>
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
</template>
