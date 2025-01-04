<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { bookStore } from "@/stores/book.ts";
import { Button } from "@/components/ui/button";
import { ref } from "vue";
import { Textarea } from "@/components/ui/textarea";

const book = bookStore();

const data = ref({
  title: "",
  price: 0.0,
  quantity: 0,
  category: "",
  author: "",
  imageUrl: "",
});

function submitForm() {
  const formData = new FormData();
  formData.append("title", data.value.title);
  formData.append("price", data.value.price);
  formData.append("quantity", data.value.quantity);
  formData.append("category", data.value.category);
  formData.append("author", data.value.author);
  formData.append("imageUrl", data.value.imageUrl);
  book.addBooks(formData);
}
</script>

<template>
  <div>
    <div
      class="flex flex-col gap-4 border-2 h-full py-5 shadow-2xl bg-slate-100 rounded-md"
    >
      <!-- Book List -->
      <div class="container flex flex-col">
        <h1 class="font-bold text-2xl">Add Book</h1>
        <div class="flex flex-col gap-2 my-3">
          <div>
            <Label for="title" class="text-base">Title</Label>
            <Input id="title" type="text" placeholder="Book Title" />
          </div>
          <div>
            <Label for="price" class="text-base">Price</Label>
            <Input id="price" type="number" placeholder="Price (RM)" />
          </div>
          <div>
            <Label for="quantity" class="text-base">Quantity</Label>
            <Input id="quantity" type="number" placeholder="Book Quantity" />
          </div>
          <div>
            <Label for="category" class="text-base">Category</Label>
            <Input id="category" type="text" placeholder="Book Category" />
          </div>
          <div>
            <Label for="author" class="text-base">Author</Label>
            <Input id="author" type="text" placeholder="Book Author" />
          </div>
          <div>
            <Label for="description" class="">Description:</Label>
            <Textarea
              type="text"
              placeholder="Provide Book Description"
              class="h-60 resize-none overflow-y-auto"
            />
          </div>
        </div>
        <div class="w-full flex justify-end gap-2">
          <Button variant="green">Confirm</Button>
          <Button variant="red">Cancel</Button>
        </div>
      </div>
    </div>
  </div>
</template>
