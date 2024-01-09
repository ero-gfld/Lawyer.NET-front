<template>
  <div class="container mx-auto p-14 bg-gray-100">
    <h1 class="text-4xl font-bold mb-8">Add New Lawyer</h1>

    <!-- Lawyer Entry Form -->
    <form @submit.prevent="submitLawyer">
      <div class="mb-4">
        <input type="text" v-model="lawyer.firstName" placeholder="First Name" class="border p-2" />
      </div>
      <div class="mb-4">
        <input type="text" v-model="lawyer.lastName" placeholder="Last Name" class="border p-2" />
      </div>
      <div class="mb-4">
        <input type="text" v-model="lawyer.specialization" placeholder="Specialization" class="border p-2" />
      </div>
      <div class="mb-4">
        <input type="number" v-model="lawyer.hourlyRate" placeholder="Hourly Rate" class="border p-2" />
      </div>
      <div class="mb-4">
        <input type="text" v-model="lawyer.address" placeholder="Address" class="border p-2" />
      </div>
      <div class="mb-4">
        <input type="text" v-model="lawyer.postalCode" placeholder="Postal Code" class="border p-2" />
      </div>
      <div class="mb-4">
        <input type="text" v-model="lawyer.city" placeholder="City" class="border p-2" />
      </div>

      <!-- File Upload Section -->
      <div class="mb-4">
        <label for="fileUpload" class="block mb-2">Lawyer Photo:</label>
        <input type="file" id="fileUpload" @change="handleFileUpload" class="border p-2" />
      </div>

      <button type="submit" class="bg-blue-500 text-white font-bold py-2 px-4 rounded">Submit Lawyer and Upload Photo</button>
       <!-- File Download Section 
      <div class="mt-8">
        <input type="text" v-model="bucketName" placeholder="Bucket Name" class="border p-2 mr-2" />
        <input type="text" v-model="objectName" placeholder="Object Name" class="border p-2" />
        <button @click="downloadFile(bucketName, objectName)" type="button" class="bg-green-500 text-white p-2">Download File</button>
      </div>-->
    </form>
  </div>
</template>

  
     
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import { v4 as uuidv4 } from 'uuid';

 
  const lawyer = ref({
    id: '',
    firstName: '',
    lastName: '',
    specialization: '',
    hourlyRate: 0,
    address: '',
    postalCode: '',
    city: '',
    
  });
  
  const selectedFile = ref<File | null>(null);
  const bucketName = ref('user');
  /*const objectName = ref('');*/
  
  
  async function submitLawyer() {
    if (!selectedFile.value) {
    alert("Please select a file to upload.");
    return;
  }
  const uuid = uuidv4(); // Generate a UUID for this operation
  lawyer.value.id = uuid; // Assign the UUID to the lawyer

  try {
    // First, create the lawyer entry
    const response = await axios.post('http://localhost:8083/lawyers', lawyer.value);
    console.log('Lawyer added:', response.data);
    alert("Lawyer added successfully.");

    // If the lawyer is successfully created, then upload the file
    await uploadFile(uuid);
  } catch (error) {
    console.error("Error in operation: ", error);
    alert("An error occurred.");
  }
}
  
  function handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      selectedFile.value = input.files[0];
    }
  }
  
  async function uploadFile(uuid: string) {
    if (!selectedFile.value) {
    alert("Please select a file to upload.");
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile.value);
  formData.append('bucketName', bucketName.value);
  formData.append('objectName', uuid + '-photo'); // Use the same UUID

  try {
    const fileUploadResponse = await axios.post('http://localhost:8083/api/files/upload', formData);
    console.log('File uploaded:', fileUploadResponse.data);
    alert("File uploaded successfully.");
  } catch (error) {
    console.error("Error uploading file: ", error);
    alert("Error uploading file.");
  }
}
  
  /*async function downloadFile(bucketName: string, objectName: string) {
    try {
      // Replace with your API endpoint
      const response = await axios({
        url: `http://localhost:8082/api/files/download?bucketName=${bucketName}&objectName=${objectName}`,
        method: 'GET',
        responseType: 'blob', 
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
  }*/
  </script>
  