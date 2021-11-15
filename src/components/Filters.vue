<template>
  <section>
    <OptionsFilter v-model="options" ref="optionsFilter" />
    <AirlinesFilter v-model="airlines" class="mt-3 mb-2" ref="airlinesFilter" />
    <a class="button-link text-xs mt-2" @click="clearAllFilters"
      >Сбросить все фильтры</a
    >
  </section>
</template>

<script>
import OptionsFilter from "@/components/OptionsFilter.vue";
import AirlinesFilter from "@/components/AirlinesFilter.vue";

export default {
  components: {
    OptionsFilter,
    AirlinesFilter,
  },
  props: {
    value: Object,
  },
  data() {
    return {
      options: [],
      airlines: [],
    };
  },
  watch: {
    options: {
      deep: true,
      handler(val) {
        console.log("Options updated: ", val);
        this.applyFilters();
      },
    },
    airlines: {
      deep: true,
      handler(val) {
        console.log("Airlines updated: ", val);
        this.applyFilters();
      },
    },
  },
  methods: {
    applyFilters() {
      let filters = {
        options: [...this.options],
        airlines: [...this.airlines],
      };
      this.$emit("input", filters);
      console.log("ApplyingFilters", filters);
    },
    clearAllFilters() {
      this.$refs.optionsFilter.clearFilter();
      this.$refs.airlinesFilter.clearFilter();
    },
  },
};
</script>

<style lang="scss"></style>
