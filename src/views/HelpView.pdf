<script setup lang="ts">
// Import your FAQ content as before
import FAQ_CONTENT from "@/constants/FaqContent";
</script>

<template>
  <div class="container mx-auto p-8 lg:p-14">
    <h1 class="text-4xl font-bold mb-8">Help and Support</h1>

    <!-- FAQ Sections -->
    <div
      v-for="(faqSection, index) in FAQ_CONTENT"
      :key="index"
      class="mb-8 bg-gray-50 p-10 rounded-lg shadow-xl lg:w-1/2"
    >
      <h2 class="text-3xl font-semibold text-blue-600 mb-4">
        {{ faqSection.title }}
      </h2>

      <!-- Individual FAQs -->
      <div
        v-for="(faq, faqIndex) in faqSection.faqs"
        :key="faqIndex"
        class="mb-6"
      >
        <h3 class="text-lg font-medium mb-2">{{ faq.question }}</h3>
        <p class="text-gray-800">{{ faq.answer }}</p>
      </div>
    </div>
    <router-link to="/imprint" class="text-blue-600 font-semibold"
      >You can find the imprint by clicking here.</router-link
    >
  </div>
</template>
