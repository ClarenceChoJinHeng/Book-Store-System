<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ref, onMounted } from "vue";
import { Textarea } from "@/components/ui/textarea";
import { useRoute } from "vue-router";
import { bookStore } from "@/stores/book";

const route = useRoute();
const bookId = route.params.id;
const bookData = bookStore();

const data = ref({
  id:Number(bookId),
  isbn: "",
  title: "",
  author: "",
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

// Fetch author data when the component is mounted
onMounted(async () => {
  let respond = await bookData.getBookById(Number(bookId)); // Assuming you have a method to fetch the author by ID

  data.value.isbn = bookData.book.isbn;
  data.value.title = bookData.book.title;
  data.value.author = bookData.book.author;
  data.value.publisher = bookData.book.publisher;
  data.value.publicationDate = bookData.book.publicationDate;
  data.value.edition = bookData.book.edition;
  data.value.language = bookData.book.language;
  data.value.genre = bookData.book.genre;
  data.value.category = bookData.book.category;
  data.value.stockQuantity = bookData.book.stockQuantity;
  data.value.price = bookData.book.price;
  data.value.description = bookData.book.description;
  data.value.ratingsReview = bookData.book.ratingsReview;
  data.value.downloadLink = bookData.book.downloadLink;
  data.value.status = bookData.book.status;
  data.value.bookImage = bookData.book.bookImage;
});
</script>

<template>
  <div>
    <div
      class="flex flex-col gap-4 border-2 h-full py-5 shadow-2xl bg-slate-100 rounded-md"
    >
      <!-- Book List -->
      <div class="container flex flex-col">
        <h1 class="font-bold text-2xl">Edit Book</h1>
        <div class="flex flex-col gap-2 my-3">
          <div>
            <Label for="isbn" class="text-base">ISBN</Label>
            <Input
              id="isbn"
              v-model="data.isbn"
              type="text"
              placeholder=" ISBN"
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
            <Input
              id="author"
              v-model="data.author"
              type="text"
              placeholder=" Author"
            />
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
              class="h-60 resize-none overflow-y-auto"
            />
          </div>
          <div>
            <Label for="ratingsReview" class="text-base">
              Ratings/Review
            </Label>
            <Input
              id="ratingsReview"
              type="text"
              v-model="data.ratingsReview"
              placeholder="Ratings/Review"
            />
          </div>

          <div>
            <Label for="status" class="text-base"> Book Status </Label>
            <Input
              id="status"
              type="text"
              v-model="data.status"
              placeholder="Book Status (e.g. No Stock)"
            />
          </div>
          <div>
            <Label for="bookImage" class="text-base"> Book Image </Label>
            <Input
              id="bookImage"
              v-model="data.bookImage"
              type="string"
              placeholder="Image"
            />
          </div>
        </div>
        <div class="w-full flex justify-end gap-2">
          <Button
            variant="green"
            @click="
              bookData.editBooks(
                data.id,
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
