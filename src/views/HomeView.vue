<script>
import InputItem from "@/components/atoms/InputItem";
import ButtonItem from "@/components/atoms/ButtonItem";
import { OhVueIcon } from "oh-vue-icons";

export default {
  name: "HomeView",
  methods: {
    search() {
      this.$router.push({
        name: "Profiles",
        params: { search: this.searchTerm ?? "all" },
      });
    },
  },
  components: {
    InputItem,
    ButtonItem,
    "v-icon": OhVueIcon,
  },
};
</script>

<template>
  <div>
    <main>
      <div
        class="relative pt-16 pb-32 flex content-center items-center justify-center"
        style="min-height: 75vh"
      >
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          style="background-image: url('/img/background-home.jpg')"
        ></div>
        <div class="container relative mx-auto">
          <div class="items-center flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div class="pr-12">
                <h1 class="text-white font-semibold text-5xl">
                  Your Legal Journey Starts Here
                </h1>
                <p class="mt-4 text-lg text-gray-300">
                  Empower your legal decisions with personalized consultations
                </p>
                <div class="flex mt-7 w-full gap-x-3">
                  <InputItem
                    class="flex-1"
                    v-model="searchTerm"
                    placeholder="Search for a profile..."
                    @keyup.enter="search"
                  />
                  <ButtonItem @click="search">Search</ButtonItem>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style="height: 70px"
        >
          <svg
            class="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              class="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>
      <section class="pb-20 bg-gray-300 -mt-24">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap">
            <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-primary"
                  >
                    <v-icon name="fa-award" scale="1.25" />
                  </div>
                  <h6 class="text-xl font-semibold">
                    Innovative Legal Solutions
                  </h6>
                  <p class="mt-2 mb-4 text-gray-600">
                    At our awarded agency, explore cutting-edge features for
                    individuals and professionals alike. Streamline your legal
                    journey with our user-friendly platform.
                  </p>
                </div>
              </div>
            </div>
            <div class="w-full md:w-4/12 px-4 text-center">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-primary"
                  >
                    <v-icon name="md-connectwithoutcontact" scale="1.25" />
                  </div>
                  <h6 class="text-xl font-semibold">
                    Connect with Top Lawyers
                  </h6>
                  <p class="mt-2 mb-4 text-gray-600">
                    Discover legal excellence with our curated network of top
                    lawyers. Explore profiles, review specialties, and schedule
                    consultations at your convenience.
                  </p>
                </div>
              </div>
            </div>
            <div class="pt-6 w-full md:w-4/12 px-4 text-center">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-primary"
                  >
                    <v-icon name="fa-fingerprint" scale="1.25" />
                  </div>
                  <h6 class="text-xl font-semibold">Tailored Legal Support</h6>
                  <p class="mt-2 mb-4 text-gray-600">
                    At our awarded agency, get personalized legal support with
                    seamless booking. Explore lawyer profiles and take control
                    of your unique legal journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap items-center mt-16">
            <div class="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div
                class="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-primary"
              >
                <v-icon
                  name="fa-user-friends"
                  class="text-white"
                  scale="1.75"
                />
              </div>
              <h3 class="text-3xl mb-2 font-semibold leading-normal">
                Start now!
              </h3>
              <p
                class="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700"
              >
                At the heart of our platform is a unique scheduling feature,
                allowing lawyers to manage their availability effortlessly.
                Block off time slots for appointments, take control of your
                schedule, and connect with clients seamlessly.
              </p>
              <p
                class="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700"
              >
                For individuals seeking legal assistance, easily browse lawyer
                profiles, identify available time slots, and book appointments.
                Don't miss out on the future of legal connections—join our
                innovative platform and transform the way you practice law!
              </p>
            </div>
            <div class="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-600"
              >
                <img
                  alt="..."
                  src="/img/getStarted.jpg"
                  class="w-full align-middle rounded-t-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="pb-20 relative block bg-gray-900">
        <div
          class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style="height: 80px"
        >
          <svg
            class="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              class="text-gray-900 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div class="container mx-auto px-4 lg:pt-24 lg:pb-64">
          <div class="flex flex-wrap text-center justify-center">
            <div class="w-full lg:w-6/12 px-4">
              <h2 class="text-4xl font-semibold text-white">Contact Us</h2>
            </div>
          </div>
          <div class="flex flex-wrap mt-12 justify-center"></div>
        </div>
      </section>
      <section class="relative block py-24 lg:pt-0 bg-gray-900">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap justify-center lg:-mt-64 -mt-48">
            <div class="w-full lg:w-6/12 px-4">
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300"
              >
                <div class="flex-auto p-5 lg:p-10">
                  <h4 class="text-2xl font-semibold">Want to contact us?</h4>
                  <p class="leading-relaxed mt-1 mb-4 text-gray-600">
                    Complete this form and we will get back to you in 24 hours.
                  </p>
                  <div class="relative w-full mb-3 mt-8">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="full-name"
                      >Full Name</label
                    ><input
                      type="text"
                      class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Full Name"
                      style="transition: all 0.15s ease 0s"
                    />
                  </div>
                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="email"
                      >Email</label
                    ><input
                      type="email"
                      class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Email"
                      style="transition: all 0.15s ease 0s"
                    />
                  </div>
                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="message"
                      >Message</label
                    ><textarea
                      rows="4"
                      cols="80"
                      class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Type a message..."
                    ></textarea>
                  </div>
                  <div class="text-center mt-6">
                    <button
                      class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style="transition: all 0.15s ease 0s"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
