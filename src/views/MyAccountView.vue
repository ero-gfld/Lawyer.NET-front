<script setup lang="ts">
import { Ref, ref } from "vue";
import VButton from "@/components/atoms/VButton.vue";
import { useLoginStore } from "@/stores/LoginStore";
import { OhVueIcon } from "oh-vue-icons";
import NoAppointmentsMessage from "@/components/organisms/NoAppointmentsMessage.vue";
import { UserModel } from "@/models/UserModel";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import { watchEffect } from "vue";
import * as Yup from "yup";
import LabelTypes from "@/constants/LabelTypes";
import VLabel from "@/components/atoms/VLabel.vue";
interface UserImages {
  [key: string]: string | null | undefined; // Allowing string, null, and undefined
}

const userImages = ref<UserImages>({});

// States
const userStore = useUserStore();
const loginStore = useLoginStore();
const { user } = storeToRefs(loginStore);

const editMode = ref(false);

fetchUser();

const userFormData = ref<UserModel>({
  id: "", 
  salutation: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "",
  role: "",
  appointments: [], 
  photoBucket: "",
  photoName: "",
  password: "",
  passwordConfirmation: "",
});

const validationErrors: Ref<{ [id: string]: string }> = ref({
  salutation: "",
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "",
  password: "",
  passwordConfirmation: "",
});

const schema = Yup.object().shape({
  salutation: Yup.string().required("Salutation is required"),
  countryCode: Yup.string()
    .required("Country is required")
    .max(2, "Conutry Code cannot contain more than 2 characters"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .min(12, "Password must be at least 12 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must include a mix of uppercase and lowercase letters, numbers, and symbols"
    )
    .required("Password is required"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});

function validate(field: string) {
  schema
    .validateAt(field, userFormData.value)
    .then(() => (validationErrors.value[field] = ""))
    .catch((err) => {
      validationErrors.value[err.path] = err.message;
    });
}

const selectedFile = ref<File | null>(null);

watchEffect(async () => {
  // Only proceed if user.value is not null
  if (user.value) {
    console.log("WatchEffect: Start fetching user images");
    try {
      const userId = user.value.id;
      const userPhotoBucket = user.value.photoBucket;
      const userPhotoName = user.value.photoName;
      console.log(`Fetching image for user ${userId}`);
      console.log(`photoBucket for user ${userId}: ${userPhotoBucket}`);
      console.log(`photoName for user ${userId}: ${userPhotoName}`);
      const imageUrl = await userStore.getFile(
        userPhotoBucket,
        userPhotoName,
        userId
      );
      console.log(`Image URL for user ${userId}: ${imageUrl}`);
      userImages.value[userId] = imageUrl ?? undefined; // Convert null to undefined
    } catch (error) {
      console.error("Error loading image for user:", user.value.id, error);
      userImages.value[user.value.id] = undefined;
    }
    console.log("WatchEffect: Finished fetching user images");
  } else {
    // Handle the case where user.value is null
    console.log("user.value is null, cannot fetch user images");
  }
});


async function fetchUser() {
  console.log("fetchUser method called");
  await loginStore.fetchUser();

  if (loginStore.isLoggedIn) {
    // Assuming loginStore.user now holds the fetched user data
    userFormData.value = { ...loginStore.user } as UserModel;
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
  schema
    .validate(userFormData.value, { abortEarly: false })
    .then(async () => {
      // Check if a new file is selected for upload
      if (selectedFile.value) {
        const file = selectedFile.value;
        const fileName = file.name;

        // Upload new file and update photo information
        await uploadFile(userFormData.value.id, fileName);
        userFormData.value.photoBucket = "lawyers";
        userFormData.value.photoName = `${userFormData.value.id}_${fileName}`;
      }

      // Update user information
      await userStore.updateUser(userFormData.value.id, userFormData.value);
      await fetchUser();
    })
    .catch((err: Yup.ValidationError) => {
      console.error("Validation error:", err);
      err.inner.forEach((e) => {
        if (e.path) validationErrors.value[e.path] = e.message;
      });
    });
}

async function uploadFile(uuid: string, fileName: string) {
  if (!selectedFile.value) {
    return; // Exit the function if no file is selected
  }

  try {
    // Proceed with the file upload
    await userStore.uploadPhoto(selectedFile.value, "lawyers", fileName, uuid);
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw error; // Re-throw the error for further handling if needed
  }
}
</script>

<template>
  <div class="grid grid-cols-5 mx-10 p-8 bg-gray-100 h-[calc(100vh-4rem)]">
    <div>
      <img
        :src="
          userImages[loginStore.user?.id || 'defaultId'] ||
          '/img/default-avatar.png'
        "
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
        <form @submit.prevent="submitUser" class="grid grid-cols-1 gap-4">
          <input
            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="userFormData.username"
            placeholder="Username"
            disabled
          />
          <input
            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="userFormData.salutation"
            placeholder="Salutation"
            @blur="validate('salutation')"
          />
          <v-label
            :label-type="LabelTypes.DANGER"
            class="text-xs"
            v-if="validationErrors.salutation"
            >{{ validationErrors.salutation }}</v-label
          >
          <input
            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="userFormData.firstName"
            placeholder="First Name"
            @blur="validate('firstName')"
          />
          <v-label
            :label-type="LabelTypes.DANGER"
            class="text-xs"
            v-if="validationErrors.firstName"
            >{{ validationErrors.firstName }}</v-label
          >
          <input
            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="userFormData.lastName"
            placeholder="Last Name"
            @blur="validate('lastName')"
          />
          <v-label
            :label-type="LabelTypes.DANGER"
            class="text-xs"
            v-if="validationErrors.lastName"
            >{{ validationErrors.lastName }}</v-label
          >
          <input
            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="userFormData.email"
            type="email"
            placeholder="Email"
            @blur="validate('email')"
          />
          <v-label
            :label-type="LabelTypes.DANGER"
            class="text-xs"
            v-if="validationErrors.email"
            >{{ validationErrors.email }}</v-label
          >
          <input
            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="userFormData.countryCode"
            placeholder="Country Code"
            @blur="validate('countryCode')"
          />
          <v-label
            :label-type="LabelTypes.DANGER"
            class="text-xs"
            v-if="validationErrors.countryCode"
            >{{ validationErrors.countryCode }}</v-label
          >
          <input
            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="userFormData.password"
            placeholder="New Password"
            type="password"
            @blur="validate('password')"
          />
          <v-label
            :label-type="LabelTypes.DANGER"
            class="text-xs"
            v-if="validationErrors.password"
            >{{ validationErrors.password }}</v-label
          >
          <input
            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="userFormData.passwordConfirmation"
            placeholder="Confirm Password"
            type="password"
            @blur="validate('passwordConfirmation')"
          />
          <v-label
            :label-type="LabelTypes.DANGER"
            class="text-xs"
            v-if="validationErrors.passwordConfirmation"
            >{{ validationErrors.passwordConfirmation }}</v-label
          >
          <div class="mb-4">
            <label
              for="fileUpload"
              class="block text-gray-700 text-sm font-bold mb-2"
              >User Photo:</label
            >
            <input
              type="file"
              id="fileUpload"
              @change="handleFileUpload"
              class="border rounded w-full text-gray-700 py-3 px-4"
            />
          </div>
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
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
