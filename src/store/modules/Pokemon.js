import Axios from 'axios';

require('axios');

export default {

    namespaced: true,

    state: {
        pokemon: {

        },
        activePokemon: {
            isActive: false,
            details: {}
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
        },
        getSort(state){
            return state.sort
        }
    },

    mutations: {
        setPokemon(state, payload) {
            state.pokemon = payload
        },
        setSorting(state, payload) {
            state.sort.ascending = payload.ascending;
            state.sort.filter = payload.filter;

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
        setActivePokemon(state, payload) {
            state.activePokemon = {}
            state.activePokemon.details = payload.activePokemon
            state.activePokemon.isActive = payload.isActive
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
                    context.commit('setSorting', {ascending: true, filter: 'id'})
                })
                .then(() => {
                    setTimeout(() => {
                        context.commit('setLoading', false, { root: true })
                    }, 200)
                })
        },
        getPokemonDetails(context, payload) {
            context.commit('setLoading', true, { root: true })
            Axios.get('https://pokeapi.co/api/v2/pokemon/' + payload)
                .then(response => {
                    
                    console.log(response)
                    context.commit('setActivePokemon', {activePokemon: response.data, isActive: true})
                })
                .then(() => {
                    setTimeout(() => {
                        context.commit('setLoading', false, { root: true })
                    }, 200)
                })
        },

        sortPokemon(context, payload) {
            context.commit('setSorting', payload);
        },

        setActive(context, payload) {
            console.log(payload);
            context.commit('setActivePokemon', payload);
        }
    }

}