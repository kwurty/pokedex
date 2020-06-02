import Axios from 'axios';

require('axios');

export default {

    namespaced: true,

    state: {
        pokemon: {

        }
    },

    getters: {
        getPokemon(state) {
            return state.pokemon;
        }
    },

    mutations: {
        setPokemon(state, payload) {
            state.pokemon = payload
        }
    },

    actions: {
        getPokemon(context) {
            if (context.state.pokemon.length > 1) {
                return
            }
            console.log('getting');
            context.commit('setLoading', true, { root: true })
            Axios.get('https://pokeapi.co/api/v2/pokemon?limit=807')
                .then(response => {
                    response.data.results.forEach(pokemon => {
                        pokemon.id = response.data.results.indexOf(pokemon) + 1
                    })
                    context.commit('setPokemon', response.data.results)
                })
                .then(() => {
                    setTimeout(() => {
                        context.commit('setLoading', false, { root: true })
                    }, 200)
                })
        }
    }

}