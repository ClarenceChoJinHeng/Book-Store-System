<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-icons/vue";
</script>

<template>
  <div class="flex items-center gap-2 border-2 border-black container">
    <p></p>
    <Select>
      <SelectTrigger class="w-[180px] border-2 border-black bg-none">
        <SelectValue class="font-bold text-black" placeholder="Filter Books" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple"> Apple </SelectItem>
          <SelectItem value="banana"> Banana </SelectItem>
          <SelectItem value="blueberry"> Blueberry </SelectItem>
          <SelectItem value="grapes"> Grapes </SelectItem>
          <SelectItem value="pineapple"> Pineapple </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <div class="relative w-full max-w-sm items-center">
      <Input id="search" type="text" placeholder="Search..." class="pl-10" />
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
      >
        <MagnifyingGlassIcon class="size-6 text-muted-foreground" />
      </span>
    </div>
  </div>
</template>
