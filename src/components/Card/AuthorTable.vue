<script setup lang="ts">
import { useAuthorStore } from "@/stores/author";
import { computed, ref } from "vue";
import { Button } from "@/components/ui/button";
const authorStore = useAuthorStore();

const authors = computed(() => authorStore.authors);

const tableTitles = [
  "ID",
  "Name",
  "Pen Name",
  "Phone Number",
  "Age",
  "Religion",
  "Biography",
];

const showDeleteModal = ref(false);
</script>

<template>
  <div class="overflow-x-auto">
    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
        <thead>
          <tr class="border-b-2 border-gray-200">
            <th
              v-for="authorTableTitle in tableTitles"
              class="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              {{ authorTableTitle }}
            </th>
          </tr>
        </thead>

        <!-- =========== TABLE DATA =========== -->
        <tbody class="divide-y divide-gray-200">
          <tr
            v-if="authors && authors.length"
            v-for="author in authors"
            :key="author.id"
          >
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ author.id }}
            </td>
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ author.name }}
            </td>
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ author.penName }}
            </td>
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ author.phoneNumber }}
            </td>
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ author.age }}
            </td>
            <td class="px-5 py-5 border-2 border-gray-200 text-sm">
              {{ author.religion }}
            </td>
            <td
              class="px-5 py-5 border-gray-200 text-sm max-h-96 border-2 max-w-96"
            >
              <p class="overflow-auto border-gray-200 max-h-96">
                {{ author.biography }}
              </p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 text-sm">
              <div class="flex items-center gap-2">
                <RouterLink :to="`/admin/author/edit-author/${author.id}`">
                  <i class="fas fa-edit cursor-pointer"></i>
                </RouterLink>
                <i
                  class="fas fa-trash cursor-pointer"
                  @click="showDeleteModal = true"
                ></i>
              </div>
            </td>
            <!-- ============ DELETE CONFIRMATION ============ -->

            <div
              class="h-full w-full absolute -translate-x-2/4 -translate-y-2/4 top-1/2 left-1/2"
              v-if="showDeleteModal"
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
                        authorStore.deleteAuthor(author.id);
                        showDeleteModal = false;
                      }
                    "
                    >Confirm
                  </Button>
                  <Button variant="red" @click="showDeleteModal = false"
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
              No authors available.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
