import { defineStore } from "pinia";
import axios from "axios";

export const useCountryStore = defineStore("countryStore", {
  state: () => ({
    countries: [],
  }),

  actions: {
    async fetchCountries() {
      try {
        const response = await axios.get("/countries.json");
        this.countries = response.data;
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    },
  },
});
