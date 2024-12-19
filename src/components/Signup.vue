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
  <div
    class="flex items-center justify-center max-h-ch80vh h-ch80vh shadow-2xl"
  >
    <!-- ===================== SIGNUP ===================== -->
    <div class="h-ch80vh py-5 px-5 w-80 max-w-80">
      <form @submit="onSubmit" class="h-80">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem class="flex flex-col gap-2">
            <FormLabel class="text-black font-bold text-3xl">Signup</FormLabel>
            <div class="flex flex-col gap-1">
              <FormLabel class="text-black font-bold text-base"
                >Username</FormLabel
              >
              <FormControl class="flex">
                <Input
                  type="text"
                  placeholder="Username"
                  v-model="form.values.username"
                  class="border-1px border-black px-1 py-1 rounded-2px"
                  ref="username"
                />
              </FormControl>
            </div>
            <div class="flex flex-col gap-1">
              <FormLabel class="text-black font-bold text-base"
                >Email</FormLabel
              >
              <FormControl class="flex">
                <Input
                  type="email"
                  placeholder="Email"
                  v-model="form.values.username"
                  class="border-1px border-black px-1 py-1 rounded-2px"
                  ref="email"
                />
              </FormControl>
            </div>
            <div class="flex flex-col gap-">
              <FormLabel class="text-black font-bold text-base"
                >Password</FormLabel
              >
              <FormControl class="flex">
                <Input
                  type="password"
                  placeholder="Password"
                  v-model="form.values.password"
                  class="border-1px border-black px-1 py-1 rounded-2px"
                  ref="password"
                />
              </FormControl>
            </div>
            <div class="flex flex-col gap-">
              <FormLabel class="text-black font-bold text-base"
                >Confirm Password</FormLabel
              >
              <FormControl class="flex">
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  v-model="form.values.password"
                  class="border-1px border-black px-1 py-1 rounded-2px"
                  ref="Confirm password"
                />
              </FormControl>
            </div>
          </FormItem>
        </FormField>
        <div class="flex mt-5 items-center justify-between">
          <Button type="submit">Submit </Button>
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Signup" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup class="flex flex-col gap-2">
                  <RouterLink to="/Signup">Buyer Signup</RouterLink>

                  <RouterLink to="/seller">Seller Signup</RouterLink>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center h-28">
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
      </form>
    </div>

    <!-- =====================  SWIPER =====================  -->
    <div class="h-ch80vh w-96 max-w-96">
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
</template>
