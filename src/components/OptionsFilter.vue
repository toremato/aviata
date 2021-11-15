<template>
  <div class="filter-block d-flex flex-column">
    <div class="d-flex justify-between">
      <h3 class="filter-header">Опции тарифа</h3>
      <FilterIcon @click="clearFilter" />
    </div>
    <Checkbox
      v-for="option in optionsList"
      :key="option.value"
      :label="option.label"
      :inputValue="option.value"
      v-model="options"
      class="mt-2 mb-2"
    />
  </div>
</template>

<script>
import FilterIcon from "@/components/ui/FilterIcon.vue";
import Checkbox from "@/components/ui/Checkbox.vue";

export default {
  components: {
    FilterIcon,
    Checkbox,
  },
  props: {
    value: Array,
  },
  data: () => {
    return {
      options: [],
      optionsList: [
        {
          label: "Только прямые",
          value: "directOnly",
        },
        {
          label: "Только с багажом",
          value: "withLuggageOnly",
        },
        {
          label: "Только возвратные",
          value: "refundableOnly",
        },
      ],
    };
  },
  watch: {
    options: {
      deep: true,
      handler(val) {
        console.log("???????", val);

        this.$emit("input", val);
      },
    },
  },
  methods: {
    clearFilter() {
      console.log("qewruewqroij");

      this.options = [];
    },
  },
};
</script>

<style></style>
