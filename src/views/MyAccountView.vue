<script setup lang="ts">
import { ref } from "vue";
import VButton from "@/components/atoms/VButton.vue";
import { useLoginStore } from "@/stores/LoginStore";
import { OhVueIcon } from "oh-vue-icons";
import NoAppointmentsMessage from "@/components/organisms/NoAppointmentsMessage.vue";
import { UserModel } from "@/models/UserModel";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import { watchEffect } from 'vue';
interface UserImages {
  [key: string]: string | null | undefined; // Allowing string, null, and undefined
}

const userImages = ref<UserImages>({});

// States
const userStore = useUserStore();
const loginStore = useLoginStore();
const { user} = storeToRefs(loginStore);

const editMode = ref(false);

fetchUser();

const userFormData = ref<UserModel>({
  id: '', // Add an appropriate value for the user's ID
  salutation: '',
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  countryCode: '',
  role: '',
  appointments: [], // Add an empty array or appropriate data for user appointments
  photoBucket: '',
  photoName: '',
  password: '',
  passwordConfirmation: '',
});
const selectedFile = ref<File | null>(null);

watchEffect(async () => {
  // Only proceed if user.value is not null
  if (user.value) {
    console.log('WatchEffect: Start fetching user images');
    try {
      const userId = user.value.id;
      const userPhotoBucket = user.value.photoBucket;
      const userPhotoName = user.value.photoName;
      console.log(`Fetching image for user ${userId}`);
      console.log(`photoBucket for user ${userId}: ${userPhotoBucket}`);
      console.log(`photoName for user ${userId}: ${userPhotoName}`);
      const imageUrl = await userStore.getFile(userPhotoBucket, userPhotoName, userId);
      console.log(`Image URL for user ${userId}: ${imageUrl}`);
      userImages.value[userId] = imageUrl ?? undefined; // Convert null to undefined
    } catch (error) {
      console.error('Error loading image for user:', user.value.id, error);
      userImages.value[user.value.id] = undefined;
    }
    console.log('WatchEffect: Finished fetching user images');
  } else {
    // Handle the case where user.value is null
    console.log('user.value is null, cannot fetch user images');
  }
});


async function fetchUser() {
  console.log("fetchUser method called");
  await loginStore.fetchUser();

  if (loginStore.isLoggedIn) {
    // Assuming loginStore.user now holds the fetched user data
    userFormData.value = {...loginStore.user} as UserModel;
    // Resetting password fields
    userFormData.value.password = "";
    userFormData.value.passwordConfirmation = "";
  } else {
    // Handle the case where login failed or user data could not be fetched
    console.error("Failed to fetch user or user is not logged in");
    // Reset user form data or take other appropriate actions
  }
}

    

    function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input && input.files) {
    selectedFile.value = input.files[0];
  }
}    

async function submitUser() {
    if (!selectedFile.value) {
      alert("Please select a file to upload.");
      return;
    }
    const file = selectedFile.value; // Get the file from the Ref object
    const fileName = file.name; // Access the name property of the File object
    await uploadFile(userFormData.value.id, fileName);
    userFormData.value.photoName = `${userFormData.value.id}_${fileName}`
    await userStore.updateUser(userFormData.value.id, userFormData.value);
 
  }


async function uploadFile(uuid: string, fileName: string) {
  if (!selectedFile.value) {
    alert("No file selected for upload.");
    return Promise.reject("No file selected for upload.");
  }
  
  // Pass the fileName to the uploadPhoto method as well
  await userStore.uploadPhoto(selectedFile.value, "lawyers", fileName, uuid);
}

</script>

<template>
  <div class="grid grid-cols-5 mx-10 p-8 bg-gray-100 h-[calc(100vh-4rem)]">
    <div>
      <img :src="userImages[loginStore.user?.id || 'defaultId'] || 'https://randomuser.me/api/portraits/men/1.jpg'"
        alt="User Avatar"
        class="rounded-full mb-4 h-40 w-40 object-cover"
      />
      <div class="w-min">
        <h2 class="text-lg font-bold">
          {{ loginStore.user?.username }}
          <oh-vue-icon
            v-if="!editMode"
            @click="editMode = true"
            name="md-modeedit"
            class="cursor-pointer text-primary hover:text-primary-light active:text-primary-lighter"
          />
        </h2>
        <div class="border-gray-300 border-b my-2" />
        <p class="font-semibold">
          {{ `${loginStore.user?.firstName} ${loginStore.user?.lastName}` }}
        </p>
        <p class="text-gray-500">{{ loginStore.user?.email }}</p>
        <form
        @submit.prevent="submitUser"
        class="grid grid-cols-1 gap-4"
      >
      <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.salutation"
          placeholder="Salutation"
        />
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.username"
          placeholder="Username"
        />
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.firstName"
          placeholder="First Name"
        />
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.lastName"
          placeholder="Last Name"
        />
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.email"
          type="email"
          placeholder="Email"
        />
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.countryCode"
          placeholder="Country Code"
        />
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.role"
          placeholder="Role"
        />
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.password"
          placeholder="New Password"
        />
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="userFormData.passwordConfirmation"
          placeholder="Confirm Password"
        />
        <div class="mb-4">
                <label for="fileUpload" class="block text-gray-700 text-sm font-bold mb-2">User Photo:</label>
                <input type="file" id="fileUpload" @change="handleFileUpload" class="border rounded w-full text-gray-700 py-3 px-4" />
              </div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
        "Update"
        </button>
      </form>
      </div>

      <v-button
        v-if="editMode"
        @click="editMode = false"
        class="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Save
      </v-button>
    </div>

    <div class="flex flex-col col-span-4">
      <h3 class="text-xl font-bold mb-4">My appointments</h3>
      <div class="grid border border-gray-300 grow place-content-center">
        <no-appointments-message
          v-if="loginStore.user?.appointments.length === 0"
        />
      </div>
    </div>
  </div>
</template>
