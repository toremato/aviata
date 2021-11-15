<template>
  <label class="checkbox-wrapper d-flex align-center">
    <input
      type="checkbox"
      :value="inputValue"
      v-model="model"
      @change="onChange"
    />
    <svg
      v-if="isChecked"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="11"
        height="11"
        rx="1.5"
        fill="#55BB06"
        stroke="#55BB06"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.95452 4.1527L5.24992 9.44537L2 6.19545L3.41421 4.78123L5.16429 6.53131L8.4597 2.82397L9.95452 4.1527Z"
        fill="white"
      />
    </svg>
    <svg
      v-else
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="11"
        height="11"
        rx="1.5"
        fill="white"
        stroke="#B9B9B9"
      />
    </svg>
    <span class="ml-3">{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    label: String,
    value: [Array, Boolean],
    inputValue: String,
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },

    isChecked() {
      return typeof this.value === "boolean"
        ? this.value
        : this.value.includes(this.inputValue);
    },
  },
  methods: {
    onChange(val) {
      this.$emit("change", val);
    },
  },
};
</script>

<style lang="scss">
label {
  user-select: none;
}

.checkbox-wrapper {
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 14px;
  line-height: 16px;
}

.checkbox-wrapper input {
  display: none;
}
</style>
