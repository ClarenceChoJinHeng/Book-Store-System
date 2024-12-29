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

const showPassword = ref(false);

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const data = ref({
  username: "",
  email: "",
  password: "",
});

const signup = async () => {
  try {
    const form = {
      username: data.value.username,
      email: data.value.email,
      password: data.value.password,
    };

    // Check if any field is empty
    if (form.username === "" || form.email === "" || form.password === "") {
      toast({
        title: "Input Field is empty",
        description: "Please ensure all the fields are not empty",
        variant: "destructive",
      });
      return;
    }

    // Validate username length
    if (form.username.length < 5) {
      toast({
        title: "Username is too short",
        description: "Please ensure username is at least 5 characters long",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    if (
      !/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.test(form.email)
    ) {
      toast({
        title: "Email format is incorrect",
        description: "Please enter a valid email",
        variant: "destructive",
      });
      return;
    }

    // Validate password criteria
    if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
        form.password
      )
    ) {
      toast({
        title: "Password does not meet criteria",
        description:
          "Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character",
        variant: "destructive",
      });
      return;
    }

    // Send to the backend
    const response = await axios.post("http://127.0.0.1:8000/api/register", {
      headers: { Accept: "application/json" },
      ...form,
    });

    toast({
      title: "Signup Successful!",
      description: "Enjoy your new account!",
    });
    data.value = { username: "", email: "", password: "" };
    // Reroute to login page
    router.push("/Login");
  } catch (err) {
    // Object Entries allow to display dynamic error message
    console.log(err);
    Object.entries(err.response.data.errors).forEach(
      ([errorName, errorMessage]) => {
        toast({
          title: "Signup Failed!",
          description: `${errorMessage}`,
          variant: "destructive",
        });
      }
    );
  }
};
</script>

<template>
  <div class="flex items-center justify-center h-ch80vh">
    <div
      class="flex items-center justify-center max-h-ch70vh h-ch70vh w-max shadow-2xl"
    >
      <!-- ===================== SIGNUP ===================== -->
      <div class="h-full py-5 px-5 max-w-80">
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

            <Button type="submit" @click="signup()">Sign Up</Button>
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
