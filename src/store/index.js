import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    selected_product: null,
    seller: null,
    keyword: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setProduct(state, payload) {
      state.selected_product = payload
    },
    setWishlist(state, payload){
      state.user.Wishlist = payload
    },
    setSeller(state, payload) {
      state.seller = payload
    },
    setKeyword(state, payload){
      state.keyword = payload
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getProduct(state) {
      return state.selected_product
    },
    getSeller(state) {
      return state.seller
    },
    getKeyword(state) {
      return state.keyword
    }
  },
  plugins: [
    createPersistedState()
  ]
})
