<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { bookStore } from "@/stores/book.ts";
import { useAuthorStore } from "@/stores/author.ts";
import { Button } from "@/components/ui/button";
import { ref, computed, watch } from "vue";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { stringifyQuery } from "vue-router";

const book = bookStore();
const useAuthor = useAuthorStore();

const authors = computed(() => useAuthor.authors);

const data = ref({
  isbn: "",
  title: "",
  author: [],
  publisher: "",
  publicationDate: "",
  edition: "",
  language: "",
  genre: "",
  category: "",
  stockQuantity: 0,
  price: 0.0,
  description: "",
  ratingsReview: "",
  downloadLink: "",
  status: "",
  bookImage: "",
});

const selectedAuthor = ref(null);

watch(selectedAuthor, (newAuthor) => {
  if (newAuthor) {
    try {
      const [id, firstName, lastName] = JSON.parse(newAuthor);
      data.value.author = [{ id, firstName, lastName }];
    } catch (e) {
      console.error("Failed to parse author:", e);
      data.value.author = [];
    }
  } else {
    data.value.author = [];
  }
});
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
            <Label for="isbn" class="text-base">ISBN</Label>
            <Input
              id="isbn"
              v-model="data.isbn"
              type="text"
              placeholder="000-0000000000"
            />
          </div>
          <div>
            <Label for="title" class="text-base">Title</Label>
            <Input
              id="title"
              v-model="data.title"
              type="text"
              placeholder=" Title"
            />
          </div>
          <div>
            <Label for="author" class="text-base">Author</Label>
            <div class="w-full flex">
              <Select v-model="selectedAuthor" class="w-max">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select Author" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="author in authors"
                      :key="author.id"
                      :value="
                        JSON.stringify([
                          author.id.toString(),
                          author.firstName,
                          author.lastName,
                        ])
                      "
                    >
                      {{ author.firstName + " " + author.lastName }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label for="publisher" class="text-base">Publisher</Label>
            <Input
              id="publisher"
              v-model="data.publisher"
              type="text"
              placeholder=" Publisher"
            />
          </div>
          <div>
            <Label for="publicationDate" class="text-base">
              Publication Date
            </Label>
            <Input
              id="publicationDate"
              v-model="data.publicationDate"
              type="date"
              placeholder="dd / mm / yyyy"
            />
          </div>
          <div>
            <Label for="edition" class="text-base"> Edition </Label>
            <Input
              id="edition"
              v-model="data.edition"
              type="text"
              placeholder="Edition"
            />
          </div>
          <div>
            <Label for="language" class="text-base"> Language </Label>
            <Input
              id="language"
              v-model="data.language"
              type="text"
              placeholder="Language"
            />
          </div>
          <div>
            <Label for="genre" class="text-base"> Genre </Label>
            <Input
              id="genre"
              v-model="data.genre"
              type="text"
              placeholder="Genre"
            />
          </div>
          <div>
            <Label for="category" class="text-base">Category</Label>
            <Input
              id="category"
              v-model="data.category"
              type="text"
              placeholder="Category"
            />
          </div>
          <div>
            <Label for="stockQuantity" class="text-base">
              Stock Quantity
            </Label>
            <Input
              id="stockQuantity"
              v-model="data.stockQuantity"
              type="number"
              min="0"
              placeholder="Stock Quantity"
            />
          </div>
          <div>
            <Label for="price" class="text-base"> Price </Label>
            <Input
              id="price"
              v-model="data.price"
              type="number"
              min="0"
              placeholder="Price (RM 0.00)"
            />
          </div>
          <div>
            <Label for="description" class="">Description:</Label>
            <Textarea
              id="description"
              v-model="data.description"
              type="text"
              placeholder="Provide Book Description"
              class="h-40 resize-none overflow-y-auto"
            />
          </div>
          <div>
            <Label for="ratingsReview" class="text-base"> Ratings/Review </Label
            ><Textarea
              id="ratingsReview"
              v-model="data.ratingsReview"
              type="text"
              placeholder="Ratings/Review"
              class="h-40 resize-none overflow-y-auto"
            />
          </div>

          <div>
            <Label for="status" class="text-base"> Book Status </Label>
            <div class="w-full flex">
              <Select v-model="data.status" class="w-max">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select Status " />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="In Stock">In Stock </SelectItem>
                    <SelectItem value="No Stock">No Stock </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label for="bookImage" class="text-base"> Book Image </Label>
            <Input
              id="bookImage"
              v-model="data.bookImage"
              type="string"
              placeholder="Image Link"
            />
          </div>
        </div>
        <div class="w-full flex justify-end gap-2">
          <Button
            variant="green"
            @click="
              book.addBooks(
                data.isbn,
                data.title,
                data.author,
                data.publisher,
                data.publicationDate,
                data.edition,
                data.language,
                data.genre,
                data.category,
                data.stockQuantity,
                data.price,
                data.description,
                data.ratingsReview,
                data.status,
                data.bookImage
              )
            "
            >Confirm</Button
          >
          <RouterLink to="/admin/book/book-manage">
            <Button variant="red">Cancel</Button></RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
