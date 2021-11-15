<template>
  <div id="app">
    <Search />
  </div>
</template>

<script>
import Search from "./views/Search.vue";

export default {
  name: "App",
  components: {
    Search,
  },
  created() {
    this.$store.dispatch("getAirlines");
    console.log("Environment: ", process.env.NODE_ENV);
  },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: flex;
  flex-direction: row;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  min-height: 100.1vh;

  body {
    margin: 0;
    padding: 0;
  }
}
</style>
