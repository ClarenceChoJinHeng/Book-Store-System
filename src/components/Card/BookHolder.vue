<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

defineProps({
  imageUrl: String,
  title: String,
  author: String,
  price: Number,
});
</script>

<template>
  <CarouselItem class="md:basis-1/2 lg:basis-1/3 w-5 overflow-hidden">
    <div class="p-1">
      <Card class="max">
        <CardContent
          class="flex aspect-square items-center justify-center p-6 w-full"
        >
          <div class="w-full p-6 flex flex-col items-center justify-center">
            <div class="w-full flex flex-col items-center justify-center">
              <img
                class="hover:grow hover:shadow-lg h-56"
                :src="imageUrl"
                alt="Book Image"
              />
              <div class="pt-3">
                <div class="flex flex-col">
                  <p class="font-bold">
                    {{ title }}
                  </p>
                  <p
                    class="text-ellipsis overflow-hidden break-normal whitespace-normal"
                  >
                    {{ author }}
                  </p>
                </div>
                <p class="pt-1 text-gray-900">RM {{ price }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </CarouselItem>
</template>
