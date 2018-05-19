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
  components: { dailyMenu, dailyList, ojbk }
};
</script>

<style>
html,
body {
  height: 100%;
}
body {
  color: #657180;
  font-size: 16px;
}
.daily {
  width: 100%;
  height: 100%;
}
</style>
