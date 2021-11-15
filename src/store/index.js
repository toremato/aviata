import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
let baseUrl = process.env.NODE_ENV === "production" ? "/aviata/" : "/";

export default new Vuex.Store({
  state: {
    airlines: {},
    flights: [],
  },
  getters: {},
  mutations: {
    setAirlines(state, airlines) {
      state.airlines = airlines;
    },
    setFlights(state, flights) {
      state.flights = flights;
    },
  },
  actions: {
    getAirlines({ commit }) {
      fetch(`${baseUrl}results.json`)
        .then((response) => response.json())
        .then((json) => {
          commit("setAirlines", json.airlines);
        });
    },

    async getFlights({ commit }) {
      return new Promise((resolve, reject) => {
        fetch(`${baseUrl}results.json`)
          .then((response) => response.json())
          .then((json) => {
            commit("setFlights", json.flights);
            resolve(json.flights);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async filterFlights({ state }, filters = null) {
      if (!filters) return [];
      return state.flights.filter((flight) => {
        if (
          filters.options.includes("directOnly") &&
          flight.itineraries[0][0].stops
        )
          return;
        if (
          filters.options.includes("withLuggageOnly") &&
          flight.services["0PC"]
        )
          return;

        if (filters.options.includes("refundableOnly") && !flight.refundable)
          return;

        if (!filters?.airlines.includes(flight.validating_carrier)) return;

        return flight;
      });
    },
  },
  // modules: {},
});
