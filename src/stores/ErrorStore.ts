import { defineStore } from "pinia";

export const useErrorStore = defineStore("errorStore", {
  state: () => ({
    errorMessage: "",
    errorDetail: "",
    isShown: false,
  }),
  actions: {
    closeError() {
      this.errorMessage = "";
      this.errorDetail = "";
      this.isShown = false;
    },
    showError(errorMessage: string, errorDetails = "") {
      this.errorMessage = errorMessage;
      this.errorDetail = errorDetails;
      this.isShown = true;
    },
  },
});
