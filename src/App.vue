<template>
  <div class="daily">
      <daily-menu></daily-menu>
      <daily-list></daily-list>
      <ojbk></ojbk>
  </div>
</template>

<script>
import dailyMenu from "./components/daily-menu.vue";
import dailyList from "./components/daily-list.vue";
import ojbk from "./components/daily-artticle.vue";

export default {
  components: { dailyMenu, dailyList, ojbk}
};
</script>

<style>
body {
  color: #657180;
  font-size: 16px;
}
</style>
