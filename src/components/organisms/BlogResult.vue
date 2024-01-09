<script setup lang="ts">
import { useBlogStore } from "@/stores/BlogStore";

const blogStore = useBlogStore();
blogStore.fetchLatestBlogs();

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};
</script>

<template>
  <section class="bg-gray-300">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
        <h2
          class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
        >
          Latest News
        </h2>
        <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
          Stay informed and empowered with our latest legal insights and
          updates, ensuring you're always ahead in navigating the dynamic legal
          landscape.
        </p>
      </div>
      <div class="grid gap-8 lg:grid-cols-2">
        <article
          v-for="blog in blogStore.blogs"
          :key="blog.id"
          class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="flex justify-between items-center mb-5 text-gray-500">
            <span class="text-sm">{{ formatDate(blog.createdOn) }}</span>
          </div>
          <h2
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ blog.title }}
          </h2>
          <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
            {{ blog.content }}
          </p>
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-4">
              <span class="font-medium dark:text-white">
                {{ blog.author }}</span
              >
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
