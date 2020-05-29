<template>
  <div class="container is-fluid" v-if="!isLoading">
    <appPokemon
      v-for="(pokemon, index) in filteredPokemon"
      :key="index"
      :url="pokemon.url"
      :name="pokemon.name"
    ></appPokemon>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Pokemon from "./Pokemon.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      morePages: true
    };
  },
  components: {
    appPokemon: Pokemon
  },
  computed: {
    ...mapGetters(["isLoading"]),
    filteredPokemon() {
      return this.$store.getters["Pokemon/getPokemon"];
    }
  },

  methods: {
    ...mapActions({
      getPokemon: "Pokemon/getPokemon"
    })
  },
  created() {
    this.getPokemon();
  }
};
</script>

<style>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 2fr));
  grid-gap: 0.5em;
}
</style>