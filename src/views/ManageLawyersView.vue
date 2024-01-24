<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Lawyer Management</h1>
    <div class="flex space-x-4 mb-6">
      <button
        class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded"
        @click="fetchLawyers"
      >
        Load Lawyers
      </button>
      <button
        class="bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-6 rounded"
        @click="setCreateMode"
      >
        Add New Lawyer
      </button>
    </div>
    <div v-if="lawyers.length > 0">
      <ul class="list-disc pl-5 mb-6">
        <li v-for="lawyer in lawyers" :key="lawyer.id" class="mb-4">
          <img
            :src="lawyerImages[lawyer.id || ''] || '/img/default-avatar.png'"
            alt="Lawyer's Photo"
            class="w-20 h-20 object-cover rounded-full"
          />
          <span class="font-medium"
            >{{ lawyer.firstName }} {{ lawyer.lastName }}</span
          >
          - {{ lawyer.specialization }}
          <button
            class="ml-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-xs"
            @click="editLawyer(lawyer)"
          >
            Edit
          </button>
          <button
            class="ml-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xs"
            @click="deleteLawyer(lawyer.id)"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
    <div class="mt-6">
      <h2 class="text-2xl font-bold mb-5">
        {{ isEditMode ? "Edit Lawyer" : "Add Lawyer" }}
      </h2>
      <form @submit.prevent="submitLawyer" class="grid grid-cols-1 gap-6">
        <input
          type="text"
          v-model="lawyerFormData.firstName"
          placeholder="First Name"
          @blur="validate('firstName')"
          class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <v-label
          :label-type="LabelTypes.DANGER"
          class="text-xs"
          v-if="validationErrors.firstName"
          >{{ validationErrors.firstName }}</v-label
        >
        <input
          type="text"
          v-model="lawyerFormData.lastName"
          placeholder="Last Name"
          @blur="validate('lastName')"
          class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <v-label
          :label-type="LabelTypes.DANGER"
          class="text-xs"
          v-if="validationErrors.lastName"
          >{{ validationErrors.lastName }}</v-label
        >
        <select
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="lawyerFormData.specialization"
          @blur="validate('specialization')"
        >
          <option value="" disabled>Select Specialization...</option>
          <option
            v-for="specialization in Object.values(LawyerSpecializations)"
            :key="specialization"
            :value="specialization"
          >
            {{ specialization }}
          </option>
        </select>
        <v-label
          :label-type="LabelTypes.DANGER"
          class="text-xs"
          v-if="validationErrors.specialization"
          >{{ validationErrors.specialization }}</v-label
        >
        <input
          type="number"
          v-model="lawyerFormData.hourlyRate"
          placeholder="Hourly Rate"
          @blur="validate('hourlyRate')"
          class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <v-label
          :label-type="LabelTypes.DANGER"
          class="text-xs"
          v-if="validationErrors.hourlyRate"
          >{{ validationErrors.hourlyRate }}</v-label
        >
        <input
          type="text"
          v-model="lawyerFormData.address"
          placeholder="Address"
          @blur="validate('address')"
          class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <v-label
          :label-type="LabelTypes.DANGER"
          class="text-xs"
          v-if="validationErrors.address"
          >{{ validationErrors.address }}</v-label
        >
        <input
          type="text"
          v-model="lawyerFormData.postalCode"
          placeholder="Postal Code"
          @blur="validate('postalCode')"
          class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <v-label
          :label-type="LabelTypes.DANGER"
          class="text-xs"
          v-if="validationErrors.postalCode"
          >{{ validationErrors.postalCode }}</v-label
        >
        <input
          type="text"
          v-model="lawyerFormData.city"
          placeholder="City"
          @blur="validate('city')"
          class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <v-label
          :label-type="LabelTypes.DANGER"
          class="text-xs"
          v-if="validationErrors.city"
          >{{ validationErrors.city }}</v-label
        >
        <div class="mb-4">
          <label
            for="fileUpload"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Lawyer Photo:</label
          >
          <input
            type="file"
            id="fileUpload"
            @change="handleFileUpload"
            class="border rounded w-full text-gray-700 py-3 px-4"
          />
        </div>
        <div class="mb-5" v-if="isEditMode">
          <h2 class="text-xl font-bold mb-3">Appointments</h2>
          <div class="border py-2 px-4">
            <lawyer-appointments :lawyer-id="lawyerFormData.id" />
          </div>
        </div>
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded"
        >
          {{ isEditMode ? "Update Lawyer" : "Submit Lawyer and Upload Photo" }}
        </button>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Ref, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import LawyerModel from "@/models/LawyerModel";
import { useLawyerStore } from "@/stores/LawyerStore";
import { storeToRefs } from "pinia";
import { watchEffect } from "vue";
import * as Yup from "yup";
import LabelTypes from "@/constants/LabelTypes";
import VLabel from "@/components/atoms/VLabel.vue";
import LawyerSpecializations from "@/constants/LawyerSpecializations";
import LawyerAppointments from "@/components/organisms/LawyerAppointments.vue";
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
      const imageUrl = await lawyerStore.getFile(
        lawyer.photoBucket,
        lawyer.photoName,
        lawyer.id
      );
      lawyerImages.value[lawyer.id] = imageUrl ?? undefined; // Convert null to undefined
    } catch (error) {
      console.error("Error loading image for lawyer:", lawyer.id, error);
      lawyerImages.value[lawyer.id] = undefined;
    }
  }
});
const lawyerFormData = ref<LawyerModel>({
  id: "",
  firstName: "",
  lastName: "",
  specialization: "",
  hourlyRate: 0,
  address: "",
  postalCode: "",
  city: "",
  availabilities: [],
  photoBucket: "",
  photoName: "",
});
const validationErrors: Ref<{ [id: string]: string }> = ref({
  firstName: "",
  lastName: "",
  specialization: "",
  hourlyRate: "",
  address: "",
  postalCode: "",
  city: "",
});
const schema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  specialization: Yup.string().required("Specialization is required"),
  hourlyRate: Yup.number()
    .typeError(() => {
      return `Hourly Rate is required`;
    })
    .required("Hourly Rate is required")
    .min(1, "Hourly Rate must be a number greater than 0"),
  address: Yup.string().required("Address is required"),
  postalCode: Yup.string().required("Postal code is required"),
  city: Yup.string().required("City is required"),
});
function validate(field: string) {
  schema
    .validateAt(field, lawyerFormData.value)
    .then(() => (validationErrors.value[field] = ""))
    .catch((err) => {
      validationErrors.value[err.path] = err.message;
    });
}
const selectedFile = ref<File | null>(null);
// Fetch lawyers
function fetchLawyers() {
  console.log("fetchLawyers method called");
  lawyerStore.fetchLawyers();
}
// Edit lawyer
function editLawyer(lawyer: LawyerModel) {
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
async function submitLawyer() {
  schema
    .validate(lawyerFormData.value, { abortEarly: false })
    .then(() => {
      if (isEditMode.value) {
        if (selectedFile.value) {
          // If a new file is selected, update photo information
          const file = selectedFile.value;
          const fileName = file.name;
          uploadFile(lawyerFormData.value.id, fileName);
          lawyerFormData.value.photoBucket = "lawyers";
          lawyerFormData.value.photoName = `${lawyerFormData.value.id}_${fileName}`;
        }
        lawyerStore.updateLawyer(lawyerFormData.value.id, lawyerFormData.value);
        resetForm();
        isEditMode.value = false;
      } else {
        const uuid = uuidv4();
        lawyerFormData.value.id = uuid;
        if (selectedFile.value) {
          // Handle new lawyer photo upload
          const file = selectedFile.value;
          const fileName = file.name;
          uploadFile(uuid, fileName);
          lawyerFormData.value.photoBucket = "lawyers";
          lawyerFormData.value.photoName = `${uuid}_${fileName}`;
        }
        lawyerStore.createLawyer(lawyerFormData.value);
        resetForm();
      }
    })
    .catch((err: Yup.ValidationError) => {
      err.inner.forEach((e) => {
        if (e.path) validationErrors.value[e.path] = e.message;
      });
    });
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
function resetForm() {
  lawyerFormData.value = {
    id: "", // Assuming the ID is a number. If it's a UUID string, adjust accordingly.
    firstName: "",
    lastName: "",
    specialization: "",
    hourlyRate: 0,
    address: "",
    postalCode: "",
    city: "",
    availabilities: [],
    photoBucket: "",
    photoName: "",
  };
  selectedFile.value = null;
}
</script>
