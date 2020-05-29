<template>
  <div class="container">
    <div class="card has-text-centered">
      <div class="container card-header has-text-centered">
        <div class="title is-uppercase">{{name}}</div>
      </div>
      <div class="card-content is-centered">
        <img :src="imageURL" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    name: String,
    url: String
  },
  components: {},
  computed: {
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
</style>

