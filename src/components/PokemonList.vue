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
          <p class="title">{{ searchedPokemon.length }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">
            Filter
            <i class="arrow" :class="{'arrow-up': sort.ascending, 'arrow-down': !sort.ascending}"></i>
          </p>

          <ul>
            <li :class="{ active: sort.filter == 'abc' }" @click="toggleSort">abc</li>
            <li :class="{ active: sort.filter == 'id'}" @click="toggleSort">id</li>
          </ul>
        </div>
      </div>
    </nav>
    <transition name="fade" mode="out-in">
      <app-loading v-if="isLoading && searchedPokemon.length > 1"></app-loading>
    </transition><transition name="fade" mode="out-in">
    <div class="container is-fluid grid" v-if="!isLoading">
      <appPokemon
        v-for="(pokemon, index) in searchedPokemon"
        :key="index"
        :url="pokemon.url"
        :name="pokemon.name"
        :id="pokemon.id"
      ></appPokemon>
    </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Pokemon from "./Pokemon.vue";
import Loading from './Loading.vue'
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      pokemon: ""
    };
  },
  components: {
    appPokemon: Pokemon,
    appLoading: Loading
  },
  computed: {
    ...mapGetters({
      isLoading: "isLoading",
      listedPokemon: "Pokemon/getPokemon",
      sort: "Pokemon/getSort"
    }),
    searchedPokemon() {
      let filtered = [];
      if (this.pokemon.length < 1) return this.listedPokemon;
      for (let poke of this.listedPokemon) {
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
      this.sortPokemon({ filter: e.target.textContent, ascending: e.target.textContent == this.sort.filter ? !this.sort.ascending : this.sort.ascending });
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
  padding-bottom: 10px;
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
  padding: 2px 10px 0px 10px;
  border: solid 1px black;
  margin: 0 10px 10px 10px;
  cursor: pointer;
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

.card {
  cursor: pointer;
}
</style>