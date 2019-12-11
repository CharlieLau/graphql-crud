<template>
  <div id="app">
    <category></category>
  </div>
</template>

<script>
import Category from "./components/Category.vue";
export default {
  name: "app",
  components: {
    Category
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
