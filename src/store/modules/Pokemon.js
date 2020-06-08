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
        },
        sortPokemon(state, payload) {
            console.log(state, payload);
            if (this.filtered == 'id') {
                if (this.ascending) {
                    this.filteredPokemon.sort((a, b) => {
                        a.id < b.id ? a : b
                    })
                } else {
                    this.filteredPokemon.sort((a, b) => {
                        a.id < b.id ? b : a
                    })
                }
            } else {
                if (this.ascending) {
                    this.filteredPokemon.sort((a, b) => a.name.localeCompare(b.name))
                } else {
                    this.filteredPokemon.sort((a, b) => a.name.localeCompare(b.name)).reverse()
                }
            }
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
        },

        sortPokemon(context, payload) {
            console.log(context,payload)
        }
    }

}