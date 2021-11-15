<template>
  <section id="search-section">
    <Filters v-model="filters" id="filters" />
    <div class="d-flex flex-column" id="search-results">
      <FlightCard
        v-for="result in searchResults"
        :key="result.id"
        :details="result"
        class="mb-3"
      />
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

import Filters from "@/components/Filters.vue";
import FlightCard from "@/components/FlightCard.vue";

export default {
  name: "App",
  components: {
    Filters,
    FlightCard,
  },
  async created() {
    console.log("created", this.searchResults);

    this.searchResults = await this.$store.dispatch("getFlights");
  },
  data() {
    return {
      searchResults: [],
      filters: {},
    };
  },
  watch: {
    filters: {
      deep: true,
      handler(val) {
        this.searchFlights(val);
      },
    },
    searchResults: {
      deep: true,
      handler(val) {
        console.log("Results123: ", val);
      },
    },
  },
  methods: {
    ...mapActions(["getFlights", "filterFlights"]),
    async searchFlights(filters = null) {
      this.searchResults = await this.filterFlights(filters ?? null);
      // await new Promise((res) => setTimeout(res, 100));
    },
  },
};
</script>

<style lang="scss" scoped>
#search-section {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  margin: 100px auto 0;
  //   padding: 0 16px;

  #filters {
    position: -webkit-sticky;
    position: sticky;
    top: 20px;
    width: 30%;
    min-width: 10rem;
  }

  @media (max-width: 800px) {
    flex-direction: column;

    #filters {
      position: relative;
      top: 0;
      width: 100%;
    }
  }

  #search-results {
    width: 100%;
    margin-left: 20px;

    @media (max-width: 800px) {
      margin-top: 1.5rem;
      margin-left: 0;
    }
  }
}
</style>
