<script setup lang="ts">
import { bookStore } from "@/stores/book";
import { ref, computed } from "vue";
import { Button } from "@/components/ui/button";

const bookData = bookStore();
const books = computed(() => bookData.books);

const tableTitle = [
  "ID",
  "ISBN",
  "Title",
  "Author",
  "Publisher",
  "Publication Date",
  "Edition",
  "Language",
  "Genre",
  "Category",
  "Stock Quantity",
  "Price",
  "Description",
  "Ratings/Review",
  "Status",
  "Book Image",
];

const showDeleteModal = ref("");
</script>

<template>
  <div class="overflow-x-auto">
    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
        <thead>
          <tr class="border-b-2 border-gray-200">
            <th
              v-for="title in tableTitle"
              class="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              {{ title }}
            </th>
          </tr>
        </thead>

        <!-- =========== TABLE DATA =========== -->
        <tbody class="divide-y divide-gray-200">
          <tr v-if="books && books.length" v-for="book in books" :key="book.id">
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ book.id }}
            </td>
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ book.isbn }}
            </td>
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ book.title }}
            </td>
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ book.author }}
            </td>
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ book.publisher }}
            </td>
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ book.publicationDate }}
            </td>
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ book.edition }}
            </td>
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ book.language }}
            </td>
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ book.genre }}
            </td>
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ book.category }}
            </td>
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ book.stockQuantity }}
            </td>
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ book.price }}
            </td>
            <td
              class="px-5 py-5 border-gray-200 text-sm max-h-52 border-2 max-w-mw30r"
            >
              <p
                class="overflow-auto border-gray-200 break-words w-rem20 max-h-52"
              >
                {{ book.description }}
              </p>
            </td>
            <td
              class="px-5 py-5 border-gray-200 text-sm max-h-52 border-2 max-w-mw30r"
            >
              <p class="overflow-auto border-gray-200 w-rem30 max-h-52">
                {{ book.ratingsReview }}
              </p>
            </td>

            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ book.status }}
            </td>
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ book.bookImage }}
            </td>
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              <div class="flex items-center gap-2">
                <RouterLink :to="`/admin/book/edit-book/${book.id}`">
                  <i class="fas fa-edit cursor-pointer"></i>
                </RouterLink>
                <i
                  class="fas fa-trash cursor-pointer"
                  @click="showDeleteModal = book.id"
                ></i>
              </div>
            </td>
            <!-- ============ DELETE CONFIRMATION ============ -->

            <div
              class="h-full w-full absolute -translate-x-2/4 -translate-y-2/4 top-1/2 left-1/2"
              v-if="showDeleteModal === book.id"
            >
              <div
                class="h-full w-full bg-slate-300 opacity-40 absolute -translate-x-2/4 -translate-y-2/4 top-1/2 left-1/2"
              ></div>

              <div
                class="flex flex-col items-center gap-5 justify-center h-72 w-72 px-5 shadow-md bg-slate-100 z-20 absolute -translate-x-2/4 -translate-y-2/4 top-1/2 left-1/2 rounded-md"
              >
                <div class="flex flex-col gap-4">
                  <p class="text-2xl font-bold break-normal w-full">
                    Are you sure you want to delete this author?
                  </p>
                  <p class="text-xs break-normal font-light w-full">
                    Deleting this author will require you to re-enter the Author
                    information again.
                  </p>
                </div>

                <div class="flex items-end justify-end h-max gap-2 mt-6 w-max">
                  <Button
                    variant="green"
                    @click="
                      () => {
                        bookData.deleteBook(book.id);
                        showDeleteModal = '';
                      }
                    "
                    >Confirm
                  </Button>
                  <Button variant="red" @click="showDeleteModal = ''"
                    >Cancel
                  </Button>
                </div>
              </div>
            </div>
          </tr>
          <tr v-else>
            <td
              colspan="6"
              class="px-5 py-5 border-b border-gray-200 text-sm text-center"
            >
              No books available.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
