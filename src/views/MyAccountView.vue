<script setup lang="ts">
import { ref } from "vue";
import VButton from "@/components/atoms/VButton.vue";
import { useLoginStore } from "@/stores/LoginStore";
import { OhVueIcon } from "oh-vue-icons";
import NoAppointmentsMessage from "@/components/organisms/NoAppointmentsMessage.vue";

const loginStore = useLoginStore();

const editMode = ref(false);
</script>

<template>
  <div class="grid grid-cols-5 mx-10 p-8 bg-gray-100 h-[calc(100vh-4rem)]">
    <div>
      <img
        src="https://randomuser.me/api/portraits/men/1.jpg"
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
