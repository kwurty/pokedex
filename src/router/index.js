import Vue from 'vue'
import VueRouter from 'vue-router'
import PokemonList from '../components/PokemonList.vue'
import PokemonDetail from '../components/PokemonDetail.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Pokemon',
    component: PokemonList
  },
  {
    path: '/pokemon/:id',
    name: 'PokemonDetail',
    component: PokemonDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
