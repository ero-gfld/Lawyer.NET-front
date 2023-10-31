<script>
import Button from "@/components/atoms/Button.vue";
import Label from "@/components/atoms/Label.vue";
import Lawyer from "../../models/lawyer.js";
import ButtonTypes from "../../constants/button-types.js";
export default {
  name: "ProfileResult",
  props: {
    profile: {
      type: Lawyer,
      required: true,
    },
  },
  data() {
    return {
      ButtonTypes,
    };
  },
  components: {
    Button,
    Label,
  },
};
</script>

<template>
  <div class="profile border p-5">
    <div class="recap flex flex-row">
      <div class="pr-5">
        <img
          class="rounded-full"
          src="https://via.placeholder.com/150"
          alt="profile image"
        />
      </div>
      <div class="flex flex-col">
        <Label class="text-primary font-bold text-lg">{{ profile.name }}</Label>
        <Label class="text-md text-stone-700 font-medium">{{
          profile.profession
        }}</Label>
        <Label class="text-sm text-stone-500"
          >${{ profile.hourlyRate }} per hour</Label
        >
        <Button class="mt-auto">Check profile</Button>
        <Label class="text-sm text-stone-500">{{ profile.address }}</Label>
        <Label class="text-sm text-stone-500"
          >{{ profile.postalCode }} {{ profile.city }}</Label
        >
      </div>
    </div>
    <div class="mt-5">
      <Button class="w-full" :buttonType="ButtonTypes.SECONDARY"
        >Show appointment availability</Button
      >
    </div>
  </div>
</template>
