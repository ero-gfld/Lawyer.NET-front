<script>
import { OhVueIcon } from "oh-vue-icons";
import NavLink from "../atoms/NavLink.vue";
import { useLoginStore } from "@/stores/loginStore";
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
    };
  },
  setup() {
    const loginStore = useLoginStore();
    return { loginStore };
  },
  methods: {
    getDropdownItems() {
      if (!this.loginStore.isLogin) {
        return [
          {
            label: this.$t("register"),
            link: "/register",
          },
          {
            label: this.$t("login"),
            link: "/login",
          },
        ];
      } else {
        return [
          {
            label: this.$t("My profile"),
            link: "/userprofile",
          },
          {
            label: this.$t("edit profile"),
            link: "/edit-profile",
          },
        ];
      }
    },
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
      <a
        v-if="loginStore.isLogin"
        @click="loginStore.logout()"
        class="flex px-2 py-1 rounded-md items-center"
        >Logout</a
      >

      <!-- temporary link for imprint in NavBar (for 1st Milestone) -->
      <router-link to="/imprint" class="flex px-2 py-1 rounded-md items-center">
        <span>Imprint</span>
      </router-link>

      <router-link
        to="/help"
        class="flex px-4 py-1 font-bold text-primary bg-white rounded-md items-center"
      >
        <v-icon name="fa-question-circle" scale="0.75" class="mr-1" />
        <span>{{ $t("navbar.help") }}</span>
      </router-link>
      <NavLink :dropdown-items="getDropdownItems()">
        <v-icon name="fa-regular-user" scale="0.75" class="mr-1" />
        <span v-if="loginStore.isLogin">{{ loginStore.userInfo }}</span>
        <span v-else>{{ $t("navbar.account") }}</span>
      </NavLink>
      <NavLink :dropdown-items="languages">
        <v-icon name="fa-globe" scale="1" />
      </NavLink>
    </div>
  </div>
</template>
