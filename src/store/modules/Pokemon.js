import Axios from 'axios';

require('axios');

export default {

    namespaced: true,

    state: {
        pokemon: {

        },
        activePokemon: {

        },
        sort: {
            ascending: true,
            filter: 'id'
        }
    },

    getters: {
        getPokemon(state) {
            return state.pokemon;
        },
        getActivePokemon(state) {
            return state.activePokemon;
        }
    },

    mutations: {
        setPokemon(state, payload) {
            state.pokemon = payload
        },
        sortPokemon(state) {
            if (state.sort.filter == "id") {
                if (state.sort.ascending) {
                    state.pokemon.sort((a, b) => {
                        return a.id < b.id ? -1 : 1;
                    });
                } else {
                    state.pokemon.sort((a, b) => {
                        return a.id < b.id ? 1 : -1;
                    });
                }
            } else {
                if (state.sort.ascending) {
                    state.pokemon.sort((a, b) => {
                        return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
                    });
                } else {
                    state.pokemon.sort((a, b) => {
                        return a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1;
                    });
                }
            }
        },
        setSorting(state, payload) {
            state.sort.ascending = payload.ascending;
            state.sort.filter = payload.filter;
        },
        setActivePokemon(state, payload) {
            state.activePokemon = payload
        }
    },

    actions: {
        getPokemon(context) {
            if (context.state.pokemon.length > 1) {
                return
            }
            context.commit('setLoading', true, { root: true })
            Axios.get('https://pokeapi.co/api/v2/pokemon?limit=807')
                .then(response => {
                    response.data.results.forEach(pokemon => {
                        pokemon.id = response.data.results.indexOf(pokemon) + 1
                    })
                    context.commit('setPokemon', response.data.results)
                })
                .then(() => {
                    context.commit('sortPokemon')
                })
                .then(() => {
                    setTimeout(() => {
                        context.commit('setLoading', false, { root: true })
                    }, 200)
                })
        },
        getPokemonDetails(context, payload) {
            Axios.get('https://pokeapi.co/api/v2/pokemon/' + payload)
                .then(response => {
                    context.commit('setActivePokemon', response.data.results)
                })
        },

        sortPokemon(context, payload) {
            context.commit('setSorting', payload);
            context.commit('sortPokemon');
        }
    }

}