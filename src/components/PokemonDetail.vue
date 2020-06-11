<template>
<div class="div">
  <app-loading v-if="isLoading"></app-loading>
  <div class="modal" :class="{'is-active': activePokemon.isActive}" v-if="activePokemon.isActive">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{activePokemon.details.name.toUpperCase()}} ({{activePokemon.details.id}})</p>
      <button class="delete" aria-label="close" @click="setActivePokemon()"></button>
    </header>
    <section class="modal-card-body">
      <img :src="'https://pokeres.bastionbot.org/images/pokemon/' + activePokemon.details.id + '.png'">


      <div class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Height</p>
            <p class="title">{{Math.round((activePokemon.details.height * 3.93701) * 100) / 100}} in</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Weight</p>
            <p class="title">{{Math.round((activePokemon.details.weight * 0.220462) * 100) / 100}} lb</p>
          </div>
        </div>
      </div>
   <div class="level">
      <div class="level-item has-text-centered">
          <div>
            <p class="heading">Types</p>
            <ul> 
              <li class="type" :class="type.type.name" v-for="(type, index) in activePokemon.details.types" :key=index> {{ type.type.name.toUpperCase() }}</li>
            </ul>
          </div>
        </div>
   </div>
     <div class="level">
      <div class="level-item has-text-centered">
          <div>
            <p class="heading">Shiny</p>
            <img v-for="(image, index) in activePokemon.details.sprites" :key=index :src="image" alt="">
          </div>
        </div>
   </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-danger" @click="setActivePokemon()">Close</button>
    </footer>
  </div>
</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from './Loading.vue'
export default {
  computed: {
    ...mapGetters({
      activePokemon: ['Pokemon/getActivePokemon'],
      isLoading: ['isLoading']
    })
  },
  components: {
    appLoading: Loading
  },
  methods: {
    setActivePokemon() {
      let obj = {
        isActive: false,
        activePokemon: {}
      }
      this.$store.dispatch('Pokemon/setActive', obj);
    }
  }
};
</script>

<style>
.inline {
  display: inline
}
ul {
  display: inline;
}
.title {
  margin-bottom: 0px;
  padding-bottom: 0px;
}
.type {
	margin: 10px;
	padding: 5px 8px 5px 8px;
	display: inline-block;
	border-radius: 6px;
	-webkit-border-radius: 6px; 
	-moz-border-radius: 6px;
	-o-border-radius: 6px;
	font-size: 13px;
	font-family: "helvetica neue", Helvetica, Verdana, sans-serif;
	color: #FFF;
	background-color: #68A090;
	border: 1px solid #44685E;
}

.normal {
	background-color: #A8A878;
	border: 1px solid #6D6D4E;
}

.fire {
	background-color: #F08030;
	border: 1px solid #9C531F;
}

.water {
	background-color: #6890F0;
	border: 1px solid #445E9C;
}

.electric {
	background-color: #F8D030;
	border: 1px solid #A1871F;
}

.grass {
	background-color: #78C850;
	border: 1px solid #4E8234;
}

.ice {
	background-color: #98D8D8;
	border: 1px solid #638D8D;
}

.ground {
	background-color: #E0C068;
	border: 1px solid #927D44;
}

.flying {
	background-color: #A890F0;
	border: 1px solid #6D5E9C;
}

.ghost {
	background-color: #705898;
	border: 1px solid #493963;
}

.rock {
	background-color: #B8A038;
	border: 1px solid #786824;
}

.fighting {
	background-color: #C03028;
	border: 1px solid #7D1F1A;
}

.poison {
	background-color: #A040A0;
	border: 1px solid #682A68;
}

.psychic {
	background-color: #F85888;
	border: 1px solid #A13959;
}

.bug {
	background-color: #A8B820;
	border: 1px solid #6D7815;
}

.dark {
	background-color: #705848;
	border: 1px solid #49392F;
}

.steel {
	background-color: #B8B8D0;
	border: 1px solid #787887;
}

.dragon {
	background-color: #7038F8;
	border: 1px solid #4924A1;
}
</style>