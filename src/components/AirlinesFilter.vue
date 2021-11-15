<template>
  <div class="filter-block">
    <div class="d-flex justify-between pr-2">
      <h3 class="filter-header">Авиакомпании</h3>
      <FilterIcon @click="clearFilter" />
    </div>
    <div class="d-flex flex-column airlines-list custom-scrollbar">
      <Checkbox
        label="Все"
        inputValue="all"
        v-model="allSelected"
        class="mt-2 mb-2"
        @change="onAllCheckedChange"
      />
      <Checkbox
        v-for="airline in Object.keys(airlines)"
        :key="airline"
        :label="airlines[airline]"
        :inputValue="airline"
        v-model="selectedAirlines"
        class="mt-2 mb-2"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
  computed: mapState({
    airlines: (state) => state.airlines,
  }),
  data() {
    return {
      selectedAirlines: [],
      allSelected: true,
    };
  },
  watch: {
    allSelected(value) {
      if (value) {
        this.selectedAirlines = [...Object.keys(this.airlines)];
      }
    },
    airlines() {
      this.selectedAirlines = [...Object.keys(this.airlines)];
    },
    selectedAirlines: {
      deep: true,
      handler(values) {
        this.allSelected =
          this.selectedAirlines.length === Object.keys(this.airlines).length;
        console.log("selected Airlines", this.selectedAirlines);
        this.$emit("input", values);
      },
    },
  },
  methods: {
    onAllCheckedChange() {
      if (!this.allSelected) this.selectedAirlines = [];
    },
    clearFilter() {
      this.selectedAirlines = [...Object.keys(this.airlines)];
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-block {
  padding-right: 0.25rem;
  .airlines-list {
    max-height: 260px;
    overflow-y: scroll;
  }
}
</style>
