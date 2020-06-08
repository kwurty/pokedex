<template>
  <div id="app">
  <section class="hero">
  <div class="hero-body">
    <div class=" has-text-centered">
      <h1 class="title">
        Pokevue
      </h1>
      <h2 class="subtitle">
        A Pokemon Explorer
      </h2>
    </div>
  </div>
</section>
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
import appLoading from "./components/Loading.vue";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoading"])
  },
  components: {
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