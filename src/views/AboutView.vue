<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const defaultValue = "item-1";

const accordionItems = [
  {
    value: "item-1",
    title: "What genres of books are available?",
    content:
      "We offer a wide range of genres including fiction, non-fiction, mystery, romance, science fiction, fantasy, and more.",
  },
  {
    value: "item-2",
    title: "Do you offer e-books?",
    content:
      "Yes, we offer a selection of e-books that you can purchase and download instantly.",
  },
  {
    value: "item-3",
    title: "Can I return a book?",
    content:
      "Yes, you can return a book within 30 days of purchase as long as it is in its original condition.",
  },
  {
    value: "item-4",
    title: "Do you have a loyalty program?",
    content:
      "Yes, we have a loyalty program where you can earn points for every purchase and redeem them for discounts on future purchases.",
  },
  {
    value: "item-5",
    title: "How can I track my order?",
    content:
      "You can track your order by logging into your account and viewing your order history. You will also receive email updates with tracking information.",
  },
  {
    value: "item-6",
    title: "Do you offer gift cards?",
    content:
      "Yes, we offer gift cards that can be purchased online and used for any item in our store.",
  },
  {
    value: "item-7",
    title: "Are there any membership benefits?",
    content:
      "Yes, members receive exclusive discounts, early access to sales, and invitations to special events.",
  },
  {
    value: "item-8",
    title: "Can I pre-order upcoming releases?",
    content:
      "Yes, you can pre-order upcoming releases and we will ship them to you as soon as they are available.",
  },
  {
    value: "item-9",
    title: "Do you have a physical store?",
    content:
      "Yes, we have several physical store locations. You can find the nearest store using our store locator on the website.",
  },
  {
    value: "item-10",
    title: "How can I contact customer service?",
    content:
      "You can contact our customer service team via email, phone, or live chat on our website. We are here to help you with any questions or concerns.",
  },
  {
    value: "item-11",
    title: "Do you offer international shipping?",
    content:
      "Yes, we offer international shipping to many countries. Shipping costs and delivery times vary based on the destination.",
  },
  {
    value: "item-12",
    title: "Can I reserve a book that is out of stock?",
    content:
      "Yes, you can reserve a book that is out of stock, and we will notify you when it becomes available.",
  },
  {
    value: "item-13",
    title: "Do you have a children's section?",
    content:
      "Yes, we have a dedicated children's section with a wide range of books for kids of all ages.",
  },
  {
    value: "item-14",
    title: "Can I get recommendations for books?",
    content:
      "Yes, our staff can provide personalized book recommendations based on your interests and reading history.",
  },
  {
    value: "item-15",
    title: "Do you host book signings and events?",
    content:
      "Yes, we regularly host book signings, author events, and other literary activities. Check our events calendar for upcoming events.",
  },
];
</script>

<template>
  <div
    class="bg-slate-50 rounded-md container font-bold flex mx-auto justify-center h-ch90vh py-5 max-h-ch90vh overflow-y-auto"
  >
    <div class="w-full">
      <Accordion
        type="single"
        class="w-full"
        collapsible
        :default-value="defaultValue"
      >
        <AccordionItem
          v-for="item in accordionItems"
          :key="item.value"
          :value="item.value"
        >
          <AccordionTrigger class="font-bold">{{
            item.title
          }}</AccordionTrigger>
          <AccordionContent>
            {{ item.content }}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
</template>
