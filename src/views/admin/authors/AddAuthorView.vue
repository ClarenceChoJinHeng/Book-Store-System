<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthorStore } from "@/stores/author.ts";
import { Button } from "@/components/ui/button";
import { ref } from "vue";
import { Textarea } from "@/components/ui/textarea";

const authors = useAuthorStore();

const data = ref({
  name: "",
  penName: "",
  phoneNumber: "",
  age: 0,
  religion: "",
  biography: "",
});
</script>

<template>
  <div>
    <div
      class="flex flex-col gap-4 border-2 h-full py-5 shadow-2xl bg-slate-100 rounded-md"
    >
      <!-- Book List -->
      <div class="container flex flex-col">
        <h1 class="font-bold text-2xl">Add Author</h1>
        <div class="flex flex-col gap-2 my-3">
          <div>
            <Label for="Name" class="text-base">Name</Label>
            <Input
              id="Name"
              type="text"
              v-model="data.name"
              placeholder="Author Name"
            />
          </div>
          <div>
            <Label for="penname" class="text-base">Pen Name:</Label>
            <Input
              id="penname"
              type="text"
              v-model="data.penName"
              placeholder="Pen Name"
            />
          </div>
          <div>
            <Label for="phoneNumber" class="text-base">Phone Number:</Label>
            <Input
              id="phoneNumber"
              type="text"
              v-model="data.phoneNumber"
              placeholder="Phone Number:"
            />
          </div>
          <div>
            <Label for="age" class="text-base">Age:</Label>
            <Input
              id="age"
              type="number"
              v-model="data.age"
              placeholder="Age"
            />
          </div>
          <div>
            <Label for="religion" class="text-base">Religion:</Label>
            <Input
              id="religion"
              type="text"
              v-model="data.religion"
              placeholder="Religion"
            />
          </div>
          <div>
            <Label for="biography" class="text-base">Biography:</Label>
            <Textarea
              id="biography"
              type="text"
              v-model="data.biography"
              placeholder="Provide Biography"
              class="h-60 resize-none overflow-y-auto"
            />
          </div>
        </div>
        <div class="w-full flex justify-end gap-2">
          <Button
            variant="green"
            @click="
              authors.addAuthor(
                data.name,
                data.penName,
                data.phoneNumber,
                data.age,
                data.religion,
                data.biography
              )
            "
            >Confirm</Button
          >
          <Button variant="red">Cancel</Button>
        </div>
      </div>
    </div>
  </div>
</template>
