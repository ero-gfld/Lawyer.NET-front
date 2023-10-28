<script>
import { OhVueIcon } from "oh-vue-icons";
import NavLink from "../atoms/NavLink.vue";
export default {
  name: "NavBar",
  data() {
    return {
      languages: [
        {
          icon: "co-gb",
          link: "/en",
        },
        {
          icon: "co-de",
          link: "/de",
        },
        {
          icon: "co-fr",
          link: "/fr",
        },
        {
          icon: "co-it",
          link: "/it",
        },
      ],
    };
  },
  components: {
    "v-icon": OhVueIcon,
    NavLink,
  },
};
</script>

<template>
  <div
    class="flex justify-between items-center h-16 px-6 bg-primary text-white"
  >
    <router-link to="/" class="text-lg">Lawyer.NET</router-link>
    <div class="grid place-content-center gap-3 text-sm grid-flow-col">
      <router-link
        to="/help"
        class="flex px-4 py-1 font-bold text-primary bg-white rounded-md items-center"
      >
        <v-icon name="fa-question-circle" scale="0.75" class="mr-1" />
        <span>{{ $t("navbar.help") }}</span>
      </router-link>
      <NavLink>
        <v-icon name="fa-regular-user" scale="0.75" class="mr-1" />
        <span>{{ $t("navbar.account") }}</span>
      </NavLink>
      <NavLink :dropdown-items="languages">
        <v-icon name="fa-globe" scale="1" />
      </NavLink>
    </div>
  </div>
</template>
