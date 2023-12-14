<script>
import LanguageOptions from "@/constants/LanguageOptions";
import NotificationTypes from "@/constants/NotificationTypes";
import NavLink from "../atoms/NavLink.vue";
import { OhVueIcon } from "oh-vue-icons";
import { useLoginStore } from "@/stores/loginStore";
import { useNotificationStore } from "@/stores/notificationStore";
export default {
  name: "NavBar",
  data() {
    return {
      languages: LanguageOptions,
      dropdownItems: this.getDropdownItems(),
    };
  },
  setup() {
    const loginStore = useLoginStore();
    return { loginStore };
  },
  methods: {
    updateDropdownItems() {
      this.dropdownItems = this.getDropdownItems();
    },
    getDropdownItems() {
      const dropdownItems = !this.loginStore.isLogin
        ? [
            {
              label: this.$t("navbar.register"),
              link: "/register",
            },
            {
              label: this.$t("navbar.login"),
              link: "/login",
            },
          ]
        : [
            {
              label: this.$t("navbar.profile"),
              link: "/profile",
            },
            {
              label: this.$t("navbar.logout"),
              action: () => {
                useNotificationStore().generateNotification(
                  "Logout successful",
                  "You have successfully logged out.",
                  NotificationTypes.SUCCESS
                );
                this.loginStore.logout();
              },
            },
          ];

      if (this.loginStore.isAdmin() && this.loginStore.isLogin) {
        return dropdownItems.concat([
          {
            separator: true,
          },
          {
            label: this.$t("navbar.admin-users"),
            link: "/admin/users",
          },
        ]);
      }

      return dropdownItems;
    },
  },
  mounted() {
    this.$watch(
      () => this.loginStore.isLogin,
      () => {
        this.updateDropdownItems();
      }
    );
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
      <NavLink
        :dropdown-items="this.dropdownItems"
        dropdown-class="min-w-[7rem]"
      >
        <v-icon name="fa-regular-user" scale="0.75" class="mr-1" />
        <span>{{
          loginStore.isLogin ? loginStore.userInfo : $t("navbar.account")
        }}</span>
      </NavLink>
      <NavLink :dropdown-items="languages">
        <v-icon name="fa-globe" scale="1" />
      </NavLink>
    </div>
  </div>
</template>
@/constants/NotificationTypes
