<template>
  <div id="app">
    <app-nav></app-nav>
    <transition name="fade">
      <app-loading v-if="isLoading"></app-loading>
    </transition>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
</style>

<script>
import appNav from "./components/Nav.vue";
import appLoading from "./components/Loading.vue";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoading"])
  },
  components: {
    appNav,
    appLoading
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>