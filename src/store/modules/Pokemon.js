import Axios from 'axios';

require('axios');

export default {

    namespaced: true,
    
    state: {
        pokemon: {

        }
    },

    getters: {
        getPokemon(state){
            return state.pokemon;
        }
    },

    mutations: {
        setPokemon(state, payload) {
            state.pokemon = payload
        }
    },  

    actions: {
        getPokemon(context){
            context.commit('setLoading', true, { root: true })
            Axios.get('https://pokeapi.co/api/v2/pokemon?limit=807')
            .then(response => {
                context.commit('setPokemon', response.data.results)
            })
            .then(() => {
                setTimeout(()=> {
                    context.commit('setLoading', false, { root: true })
                }, 1000)
            })
        }
    }

}