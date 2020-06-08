<template>
  <div class>
    <nav class="navbar level is-fixed-top">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Search Pokemon</p>
          <input type="text" class="input is-small" v-model="pokemon" />
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Matching Pokemon</p>
          <p class="title">{{filteredPokemon.length}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">
            Filter
            <i class="arrow" :class="{'arrow-up': ascending, 'arrow-down': !ascending}"></i>
          </p>

          <ul>
            <li
              :class="{ active: filtered == 'abc' }"
              @click="sortPokemon({ ascending, filtered })"
            >abc</li>
            <li
              :class="{ active: filtered == 'id'}"
              @click="sortPokemon({ ascending, filtered })"
            >id</li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container is-fluid grid" v-if="!isLoading">
      <appPokemon
        v-for="(pokemon, index) in filteredPokemon"
        :key="index"
        :url="pokemon.url"
        :name="pokemon.name"
        :id="pokemon.id"
      ></appPokemon>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Pokemon from "./Pokemon.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      morePages: true,
      pokemon: "",
      filtered: "id",
      ascending: true
    };
  },
  components: {
    appPokemon: Pokemon
  },
  computed: {
    ...mapGetters(["isLoading"]),
    filteredPokemon() {
      let gathered = this.$store.getters["Pokemon/getPokemon"];
      let filtered = [];
      if (this.pokemon.length < 1) return gathered;
      for (let poke of gathered) {
        poke.name.includes(this.pokemon) ? filtered.push(poke) : undefined;
      }
      return filtered;
    }
  },

  methods: {
    ...mapActions({
      getPokemon: "Pokemon/getPokemon",
      sortPokemon: "Pokemon/sortPokemon"
    }),
    toggleSort(e) {
      if (this.filtered != e.target.textContent) {
        this.filtered = e.target.textContent;
      } else {
        this.ascending = !this.ascending;
      }
    }
  },
  created() {
    this.getPokemon();
  }
};
</script>

<style scoped>

nav {
  background: rgba(255, 0, 0, 1);
  color: white;
}
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 2fr));
  grid-gap: 0.5em;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 2fr));
  grid-gap: 0.5em;
}
ul li {
  display: inline;
  padding: 2px 10px 2px 10px;
  border: solid 1px black;
  margin: 0 10px 0px 10px;
}

.active {
  font-weight: 800;
  background-color: white;
  color: red;
}

.arrow {
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}

.arrow-up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.arrow-down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.title {
  color: white;
}
</style>