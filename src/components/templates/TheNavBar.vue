<script setup lang="ts">
import NavItem from "@/components/molecules/NavItem.vue";
import { useLoginStore } from "@/stores/LoginStore";
import DropdownItemOptions from "@/models/DropdownItemOptions/DropdownItemOptions";
import { ref, watch } from "vue";
import LANGUAGE_OPTIONS from "@/constants/LanguageOptions";
import {
  USER_LOGGED_DROPDOWN_ITEMS,
  USER_NOT_LOGGED_DROPDOWN_ITEMS,
  ADMIN_DROPDOWN_ITEMS,
} from "@/constants/UserDropdownItems";

const loginStore = useLoginStore();
const dropdownItems = ref(getDropdownItems());
const languageItems = ref([...LANGUAGE_OPTIONS]);

function getDropdownItems() {
  const dropdownItems: DropdownItemOptions[] = [
    ...(loginStore.isLoggedIn
      ? USER_LOGGED_DROPDOWN_ITEMS
      : USER_NOT_LOGGED_DROPDOWN_ITEMS),
  ];

  if (loginStore.isAdmin() && loginStore.isLoggedIn) {
    const adminDropdownItems = dropdownItems.concat(ADMIN_DROPDOWN_ITEMS);
    return adminDropdownItems;
  }

  return dropdownItems;
}

function updateDropdownItems() {
  dropdownItems.value = getDropdownItems();
}

watch(() => loginStore.isLoggedIn, updateDropdownItems);
</script>

<template>
  <div
    class="flex justify-between items-center h-16 px-6 bg-primary text-white"
  >
    <router-link to="/" class="text-lg">Lawyer.NET</router-link>
    <div class="grid place-items-center gap-3 text-sm grid-flow-col">
      <router-link
        to="/help"
        class="flex px-4 py-1 font-bold text-primary bg-white rounded-md items-center hover:text-primary-lighter"
      >
        <v-icon name="fa-question-circle" scale="0.75" class="mr-1" />
        <span>{{ $t("navbar.help") }}</span>
      </router-link>
      <nav-item :dropdown-items="dropdownItems" dropdown-class="min-w-[7rem]">
        <v-icon name="fa-regular-user" scale="0.75" class="mr-1" />
        <span>{{
          loginStore.isLoggedIn
            ? loginStore.user?.username
            : $t("navbar.account")
        }}</span>
      </nav-item>
      <nav-item
        class="border-none px-1 -mx-1"
        :dropdown-items="languageItems"
        dropdown-class="min-w-[3rem]"
      >
        <v-icon name="fa-globe" scale="1.3" />
      </nav-item>
    </div>
  </div>
</template>
