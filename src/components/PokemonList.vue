<template>
  <div class>
    <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Search Pokemon</p>
          <input type="text" class="input is-large" v-model="pokemon" />
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
          <p class="heading">Filter</p>
          <ul>
            <label
              :class="{'arrow-up': (filtered == 'abc' && ascending)}"
              v-if="filtered == 'abc' && ascending"
            ></label>
            <label
              :class="{'arrow-down': (filtered == 'abc' && !ascending)}"
              v-if="filtered == 'abc' && !ascending"
            ></label>
            <li :class="{ active: filtered == 'abc' }" @click="toggleSort">abc</li>

            <label
              :class="{'arrow-up': (filtered == 'id' && ascending)}"
              v-if="filtered == 'id' && ascending"
            ></label>
            <label
              :class="{'arrow-down': (filtered == 'id' && !ascending)}"
              v-if="filtered == 'id' && !ascending"
            ></label>
            <li :class="{ active: filtered == 'id'}" @click="toggleSort">id</li>
          </ul>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Likes</p>
          <p class="title">789</p>
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
      getPokemon: "Pokemon/getPokemon"
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
  background-color: red;
  color: white;
}

.arrow-up {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;

  border-bottom: 10px solid red;
}

.arrow-down {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;

  border-top: 10px solid #f00;
}
</style>