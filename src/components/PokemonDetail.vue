<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <!-- Any other Bulma elements you want -->
      {{id}}
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      getActivePokemon: "Pokemon/getActivePokemon"
    })
  },
  props: [
    {
      id: String
    }
  ],
  methods: {
    ...mapActions({
      getPokemonDetails: "Pokemon/getPokemonDetails"
    })
  }
};
</script>

<style>
</style>