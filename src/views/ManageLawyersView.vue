      <template>
        <div class="container mx-auto p-6">
          <h1 class="text-3xl font-bold mb-6">Lawyer Management</h1>
      
          <div class="flex space-x-4 mb-6">
            <button class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded" @click="fetchLawyers">
              Load Lawyers
            </button>
            <button class="bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-6 rounded" @click="setCreateMode">
              Add New Lawyer
            </button>
          </div>
      
          <div v-if="lawyers.length > 0">
            <ul class="list-disc pl-5 mb-6">
              <li v-for="lawyer in lawyers" :key="lawyer.id" class="mb-4">
                <img :src="lawyerImages[lawyer.id] || ''" alt="Lawyer's Photo" class="w-20 h-20 object-cover rounded-full">
                <span class="font-medium">{{ lawyer.firstName }} {{ lawyer.lastName }}</span> - {{ lawyer.specialization }}
                <button class="ml-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-xs" @click="editLawyer(lawyer)">
                  Edit
                </button>
                <button class="ml-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xs" @click="deleteLawyer(lawyer.id)">
                  Delete
                </button>
              </li>
            </ul>
          </div>
      
          <div class="mt-6">
            <h2 class="text-2xl font-bold mb-5">{{ isEditMode ? "Edit Lawyer" : "Add Lawyer" }}</h2>
            <form @submit.prevent="submitLawyer" class="grid grid-cols-1 gap-6">
              <input type="text" v-model="lawyerFormData.firstName" placeholder="First Name" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <input type="text" v-model="lawyerFormData.lastName" placeholder="Last Name" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <input type="text" v-model="lawyerFormData.specialization" placeholder="Specialization" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <input type="number" v-model="lawyerFormData.hourlyRate" placeholder="Hourly Rate" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <input type="text" v-model="lawyerFormData.address" placeholder="Address" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <input type="text" v-model="lawyerFormData.postalCode" placeholder="Postal Code" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <input type="text" v-model="lawyerFormData.city" placeholder="City" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
             <div class="mb-4">
                <label for="fileUpload" class="block text-gray-700 text-sm font-bold mb-2">Lawyer Photo:</label>
                <input type="file" id="fileUpload" @change="handleFileUpload" class="border rounded w-full text-gray-700 py-3 px-4" />
              </div>
              <button type="submit" class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded">
                {{ isEditMode ? "Update Lawyer" : "Submit Lawyer and Upload Photo" }}
              </button>
            </form>
          </div>
        </div>
      </template>
      
      


  
     
  
<script setup lang="ts">
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { LawyerResultModel } from "@/models/LawyerResultModel";
import { useLawyerStore } from "@/stores/LawyerStore";
import { storeToRefs } from "pinia";
import { watchEffect } from 'vue';

interface LawyerImages {
  [key: string]: string | null | undefined; // Allowing string, null, and undefined
}

const lawyerImages = ref<LawyerImages>({});



// States
const lawyerStore = useLawyerStore();
const { lawyers } = storeToRefs(lawyerStore);
const isEditMode = ref(false);

watchEffect(async () => {
  for (const lawyer of lawyers.value) {
    try {
      const imageUrl = await lawyerStore.getFile(lawyer.photoBucket, lawyer.photoName, lawyer.id);
      lawyerImages.value[lawyer.id] = imageUrl ?? undefined; // Convert null to undefined
    } catch (error) {
      console.error('Error loading image for lawyer:', lawyer.id, error);
      lawyerImages.value[lawyer.id] = undefined;
    }
  }
});



const lawyerFormData = ref<LawyerResultModel>({
  id: '',
  firstName: '',
  lastName: '',
  specialization: '',
  hourlyRate: 0,
  address: '',
  postalCode: '',
  city: '',
  availabilities: [],
  
  photoBucket: '',
  photoName: '',
  // Include additional fields as needed
});
const selectedFile = ref<File | null>(null);

// Fetch lawyers
function fetchLawyers() {
      console.log("fetchLawyers method called");
      lawyerStore.fetchLawyers();
    }

// Edit lawyer
function editLawyer(lawyer: LawyerResultModel) {
  isEditMode.value = true;
  lawyerFormData.value = { ...lawyer };
}


function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input && input.files) {
    selectedFile.value = input.files[0];
  }
}


// Submit lawyer
// Submit lawyer
async function submitLawyer() {
  if (isEditMode.value) {
    if (!selectedFile.value) {
      alert("Please select a file to upload.");
      return;
    }
    const file = selectedFile.value; // Get the file from the Ref object
    const fileName = file.name; // Access the name property of the File object
    await uploadFile(lawyerFormData.value.id, fileName);
    lawyerFormData.value.photoName = `${lawyerFormData.value.id}_${fileName}`
    await lawyerStore.updateLawyer(lawyerFormData.value.id, lawyerFormData.value);
    resetForm();
    isEditMode.value = false;
  } else {
    if (!selectedFile.value) {
      alert("Please select a file to upload.");
      return;
    }
    try {
      const uuid = uuidv4();
      const file = selectedFile.value; // Get the file from the Ref object
      const fileName = file.name; // Access the name property of the File object
      await uploadFile(uuid, fileName); // Pass fileName as an argument
      lawyerFormData.value.id = uuid;
      // Use template literals to construct the photoPath string
      lawyerFormData.value.photoBucket = 'lawyers'
      lawyerFormData.value.photoName = `${uuid}_${fileName}`;
      await lawyerStore.createLawyer(lawyerFormData.value);
      resetForm();
    } catch (error) {
      alert("Error uploading file.");
      console.error("Error uploading file: ", error);
    }
  }
}


// Upload file
async function uploadFile(uuid: string, fileName: string) {
  if (!selectedFile.value) {
    alert("No file selected for upload.");
    return Promise.reject("No file selected for upload.");
  }
  
  // Pass the fileName to the uploadPhoto method as well
  await lawyerStore.uploadPhoto(selectedFile.value, "lawyers", fileName, uuid);
}



// Delete lawyer
async function deleteLawyer(lawyerId: string) {
  lawyerStore.deleteLawyer(lawyerId);
}

// Set create mode
function setCreateMode() {
  isEditMode.value = false;
  resetForm();
}





// Reset form
// Reset form
function resetForm() {
  lawyerFormData.value = {
    id: '', // Assuming the ID is a number. If it's a UUID string, adjust accordingly.
    firstName: '',
    lastName: '',
    specialization: '',
    hourlyRate: 0,
    address: '',
    postalCode: '',
    city: '',
    availabilities: [],
    photoBucket: '',
    photoName: ''
  };
  selectedFile.value = null;
}


</script>

  