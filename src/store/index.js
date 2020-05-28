import Vue from 'vue'
import Vuex from 'vuex'
import Pokemon from './modules/Pokemon'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false
  },
  mutations: {
    setLoading(state, payload){
      state.loading = payload;
    }
  },
  getters: {
    isLoading(state) {
      return state.loading;
    }
  },
  actions: {
  },
  modules: {
    Pokemon
  }
})
