<script setup lang="ts">
// Components for design from shadcn-vue and vue
import { Button } from "@/components/ui/button";

// Front-end validation for signup
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useField, useForm } from "vee-validate";

// Popup message Toast
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

// Routing pages
import { RouterLink } from "vue-router";
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

const formSchema = toTypedSchema(
  z
    .object({
      username: z
        .string()
        .min(2, "Username must be at least 2 characters")
        .max(30, "Username cannot be more than 30 characters"),
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .min(6, "Password must be atlesat 6 characters")
        .max(20, "Password cannot be more than 20 characters"),
      confirmpassword: z.string(),
    })
    .refine((data) => data.password === data.confirmpassword, {
      message: "Password don't match",
      path: ["confirmpassword"],
    })
);

// Create the form using vee-validate
const { handleSubmit, errors } = useForm({
  validationSchema: formSchema,
  initialValues: {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  },
});

// Define the fields
const { value: username, errorMessage: usernameError } = useField("username");
const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");
const { value: confirmpassword, errorMessage: confirmpasswordError } =
  useField("confirmpassword");

// This is where data is send from the front-end to the back-end
const onSubmit = handleSubmit(async (values) => {});
</script>

<template>
  <div
    class="flex items-center justify-center max-h-ch80vh h-ch80vh shadow-2xl"
  >
    <!-- ===================== SIGNUP ===================== -->
    <div class="h-ch80vh py-5 px-5 w-80 max-w-80">
      <div class="text-black font-bold text-3xl mb-5">Signup</div>
      <form @submit.prevent="onSubmit" class="h-72 flex flex-col gap-2">
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

        <!-- ============= Email FormField ============= -->

        <FormField name="email">
          <FormItem>
            <FormLabel class="text-black font-bold text-base">Email</FormLabel>
            <FormControl class="flex">
              <Input
                v-model="email"
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

        <!-- ============= Confirm Password FormField ============= -->

        <FormField name="confirmpassword">
          <FormItem>
            <FormLabel class="text-black font-bold text-base"
              >Confirm Password</FormLabel
            >
            <FormControl class="flex">
              <Input
                v-model="confirmpassword"
                type="password"
                placeholder="Confirm Password"
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
              <SelectValue placeholder="Select Signup page" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup class="flex flex-col gap-2">
                <RouterLink to="/Login">Buyer Signup</RouterLink>

                <RouterLink to="/seller">Seller Signup</RouterLink>
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
          <RouterLink to="/Login"
            ><span
              class="hover:underline hover:cursor-pointer hover:text-sky-500 text-0.7rem font-bold"
              >Already Have an Account?</span
            ></RouterLink
          >
        </div>
      </div>
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
