<template>
  <div class="container">
    <div class="card has-text-centered" @click="setPokemon()">
      <div class="container card-header has-text-centered">
        <div class="title2 is-uppercase">{{name}}</div>
        {{id}}
      </div>
      <div class="card-content is-centered">
        <img :src="imageURL" />
      </div>
    </div>
    <app-pokemon-detail v-if="activePokemon.isActive"></app-pokemon-detail>
  </div>
</template>

<script>
import PokemonDetail from "./PokemonDetail.vue";
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: false
    };
  },
  props: {
    name: String,
    url: String,
    id: Number
  },
  components: {
    appPokemonDetail: PokemonDetail,
  },
  methods: {
    ...mapActions({
    getPokemonDetails: 'Pokemon/getPokemonDetails'
    }),
    setPokemon(){

    }
  },
  computed: {
        ...mapGetters({
      activePokemon: ['Pokemon/getActivePokemon'],
      isLoading: ['isLoading']
    }),
    imageURL() {
      let pokeID = this.url.match(/\/pokemon\/(\d+)\//);
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID[1]}.png`;
    }
  }
};

// :base_experience="pokemon.base_experience"
// :height="pokemon.height"
// :is_default="pokemon.is_default"
// :order="pokemon.order"
// :weight="pokemon.weight"
// :abilities="pokemon.abilities"
// :forms="pokemon.forms"
// :game_indices="pokemon.game_indices"
// :held_items="pokemon.held_items"
// :location_area_encounters="pokemon.location_area_encounters"
// :moves="pokemon.moves"
// :sprites="pokemon.sprites"
// :species="pokemon.species"
// :stats="pokemon.stats"
// :types="pokemon.types"
</script>

<style>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 2fr));
  grid-gap: 0.5em;
}

.card-header {
  background: red;
  color: white;
}

.title2 {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.125;
}

.card {
  border: 1px solid rgba(0, 0, 0, 0.4);
  cursor: pointer;
}
</style>

