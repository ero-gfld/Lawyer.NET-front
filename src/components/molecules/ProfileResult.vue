<script>
import Button from "@/components/atoms/Button.vue";
import Label from "@/components/atoms/Label.vue";
import LawyerResult from "../../models/lawyer-result.js";
import ButtonTypes from "../../constants/button-types.js";
import { parse, format } from "date-fns";
export default {
  name: "ProfileResult",
  props: {
    profile: {
      type: LawyerResult,
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
  methods: {
    getFullDay(date) {
      return format(parse(date, "yyyy-MM-dd", new Date()), "do MMMM");
    },
    getDayOfWeek(date) {
      return format(parse(date, "yyyy-MM-dd", new Date()), "EEEE");
    },
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
      <div class="flex flex-col justify-between">
        <div class="flex flex-col">
          <Label class="text-primary font-bold text-lg -mb-1">{{
            `${profile.firstName} ${profile.lastName}`
          }}</Label>
          <Label class="text-md text-stone-700 font-medium">{{
            profile.specialization
          }}</Label>
          <Label class="text-sm text-stone-500"
            >${{ `${profile.hourlyRate} ${$t("profile.result.fees")}` }}</Label
          >
        </div>
        <div class="flex flex-col">
          <Button>{{ $t("profile.result.check-profile") }}</Button>
        </div>
        <div class="flex flex-col">
          <Label class="text-sm text-stone-500">{{ profile.address }}</Label>
          <Label class="text-sm text-stone-500"
            >{{ profile.postalCode }} {{ profile.city }}</Label
          >
        </div>
      </div>
    </div>
    <div
      class="mt-5 flex flex-row justify-between border rounded-lg px-10 py-3"
    >
      <div v-for="schedule in profile.availabilities" :key="schedule.date">
        <div class="flex flex-col place-items-center">
          <Label class="text-stone-500">{{
            this.getDayOfWeek(schedule.date)
          }}</Label>
          <Label>{{ this.getFullDay(schedule.date) }}</Label>
          <div class="flex flex-col mt-4 gap-y-3">
            <div
              v-for="time in schedule.availabilities"
              :key="time"
              class="text-primary font-semibold bg-primary-lightest border-2 border-primary-lighter rounded-lg px-4"
            >
              {{ time }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
