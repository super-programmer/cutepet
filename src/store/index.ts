import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      userId:null
    }
  },
  mutations: {
    setUser(state,user){
      state.user = user;
    }
  },
  actions: {
    setUser({commit},user){
      commit('setUser',user)
    }
  },
  getters: {
    getUser: (state) =>{return state.user},
    getUserId: (state) =>{return state.user.userId}
    },
  modules: {
  }
})
