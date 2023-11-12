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
          scale: 1.3,
        },
        {
          icon: "co-de",
          link: "/de",
          scale: 1.3,
        },
        {
          icon: "co-fr",
          link: "/fr",
          scale: 1.3,
        },
        {
          icon: "co-it",
          link: "/it",
          scale: 1.3,
        },
      ],
      accountOptions: [
        {
          label: this.$t("navbar.profile"),
          link: "/profile",
        },
        {
          label: this.$t("navbar.settings"),
          link: "/settings",
        },
        {
          label: this.$t("navbar.logout"),
          link: "/logout",
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
      <NavLink :dropdown-items="accountOptions">
        <v-icon name="fa-regular-user" scale="0.75" class="mr-1" />
        <span>{{ $t("navbar.account") }}</span>
      </NavLink>
      <NavLink :dropdown-items="languages">
        <v-icon name="fa-globe" scale="1" />
      </NavLink>
    </div>
  </div>
</template>
