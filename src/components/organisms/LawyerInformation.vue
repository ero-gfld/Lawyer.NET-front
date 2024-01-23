<script setup lang="ts">
import VLabel from "@/components/atoms/VLabel.vue";
import LawyerSearchModel from "@/models/LawyerSearchModel";
import { defineProps, onBeforeMount, ref } from "vue";
import { useLawyerStore } from "@/stores/LawyerStore";

const props = defineProps<{
  profile: LawyerSearchModel;
}>();

const imageUrl = ref("https://via.placeholder.com/100");

function formatSpecialization(str: string) {
  return str
    .replace(/_/g, " ")
    .replace(
      /(\w)(\w*)/g,
      (_, firstChar, restOfString) =>
        firstChar.toUpperCase() + restOfString.toLowerCase()
    );
}

onBeforeMount(async () => {
  const imageResponse = await useLawyerStore().getFile(
    props.profile.photoBucket,
    props.profile.photoName,
    props.profile.id
  );
  if (imageResponse) {
    imageUrl.value = imageResponse;
  }
});
</script>

<template>
  <div class="flex gap-x-5 h-28">
    <div>
      <img
        class="rounded-full object-cover object-center w-28 h-28"
        :src="imageUrl"
        :alt="`${props.profile.firstName} ${props.profile.lastName} profile picture`"
      />
    </div>
    <div class="flex flex-col justify-center">
      <div class="flex flex-col">
        <v-label class="text-primary font-bold text-lg -mb-1">{{
          `${props.profile.firstName} ${props.profile.lastName}`
        }}</v-label>
        <v-label class="text-md text-stone-700 font-medium">{{
          formatSpecialization(props.profile.specialization)
        }}</v-label>
        <v-label class="text-sm text-stone-500"
          >${{
            `${props.profile.hourlyRate} ${$t("profile.result.fees")}`
          }}</v-label
        >
        <v-label class="text-sm text-stone-500">{{
          props.profile.address
        }}</v-label>
        <v-label class="text-sm text-stone-500"
          >{{ props.profile.postalCode }} {{ props.profile.city }}</v-label
        >
      </div>
    </div>
  </div>
</template>
