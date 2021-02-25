import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jobsHistory: []
  },
  mutations: {
    addHistory(state, job){
      state.jobsHistory.push(job)
    }
  },
  actions: {
  },
  modules: {
  }
})
