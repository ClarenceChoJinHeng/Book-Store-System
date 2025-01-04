<script setup lang="ts">
import Store from "@/components/Card/Store.vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";

import "@/assets/carousel.css";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

const modules = [Pagination, Autoplay];
</script>

<template>
  <body>
    <div class="h-96">
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
          ><img src="../assets/wimpy-banner.jpg" alt=""
        /></swiper-slide>
        <swiper-slide
          ><img
            src="../assets/headDW_Diamond_Insignia_Digital_PhotographyFull_1620x1080px_72dpi_RGB-42d4110fbc.jpg"
            alt="doctor-who"
        /></swiper-slide>
        <swiper-slide>
          <img src="../assets/Batman-comics.avif" alt="batman-comic"
        /></swiper-slide>
        <swiper-slide
          ><img src="../assets/20231003_082457.webp" alt="marvel-comics"
        /></swiper-slide>
        <swiper-slide
          ><img src="../assets/CoverCOMICALL5-1.jpg" alt="bible-comics"
        /></swiper-slide>
      </swiper>
    </div>

    <!-- Store Section -->

    <Store />
  </body>
</template>
