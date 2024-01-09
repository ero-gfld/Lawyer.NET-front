<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

// Import your FAQ content as before
import FAQ_CONTENT from "@/constants/FaqContent";

const selectedFile = ref<File | null>(null);
const bucketName = ref('user');
const objectName = ref('');

function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files?.[0]) {
    selectedFile.value = input.files[0];
  }
}

async function uploadFile() {
  if (!selectedFile.value) {
    alert("Please select a file first.");
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile.value);
  formData.append('bucketName', bucketName.value); // Replace with your bucket name
  formData.append('objectName', selectedFile.value.name);

  try {
    const response = await axios.post('http://localhost:8082/api/files/upload', formData);
    console.log(response.data);
    alert("File uploaded successfully.");
  } catch (error) {
    console.error("Error uploading file: ", error);
    alert("Error uploading file.");
  }
}

async function downloadFile(bucketName: string, objectName: string) {
  try {
    const response = await axios({
      url: `http://localhost:8082/api/files/download?bucketName=${bucketName}&objectName=${objectName}`,
      method: 'GET',
      responseType: 'blob', // important for handling binary data
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', objectName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error downloading file: ", error);
    alert("Error downloading file.");
  }
}
</script>



<template>
  <div class="container mx-auto p-14 bg-gray-100">
    <h1 class="text-4xl font-bold mb-8">Help and Support</h1>

        <!-- File Upload Form -->
        <div class="mb-8">
      <input type="file" @change="handleFileUpload" />
      <button @click="uploadFile" class="bg-blue-500 text-white font-bold py-2 px-4 rounded">Upload Photo</button>
    </div>

    <!-- File Download Section -->
    <div class="mb-8">
      <input type="text" v-model="bucketName" placeholder="Bucket Name">
      <input type="text" v-model="objectName" placeholder="Object Name">
      <button @click="downloadFile(bucketName, objectName)" class="bg-green-500 text-white font-bold py-2 px-4 rounded">Download File</button>
    </div>
    <!-- FAQ Sections -->
    <div
      v-for="(faqSection, index) in FAQ_CONTENT"
      :key="index"
      class="mb-8 bg-white p-10 rounded-lg shadow-md w-3/4"
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
