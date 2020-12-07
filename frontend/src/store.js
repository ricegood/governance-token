import Vue from 'vue'
import Vuex from 'vuex'
import getWeb3 from './utils/getWeb3'
import getContract from './utils/getContract'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3: {
      isInjected: false,
      web3Instance: null,
      networkId: null,
      coinbase: null,
      balance: null,
      error: null,
    },
    contractInstance: null,
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    registerWeb3Instance (state, payload) {
     console.log('registerWeb3instance Mutation being executed', payload)
     const result = payload
     const web3Copy = state.web3
     web3Copy.coinbase = result.coinbase
     web3Copy.networkId = result.networkId
     web3Copy.balance = parseInt(result.balance, 10)
     web3Copy.isInjected = result.injectedWeb3
     web3Copy.web3Instance = result.web3
     state.web3 = web3Copy
   },
   registerContractInstance (state, payload) {
     console.log('voting contract instance: ', payload)
     state.contractInstance = () => payload
   },
  },
  actions: {
    async registerWeb3 ({ commit }) {
      console.log('registerWeb3 Action being executed')
      try {
        const result = await getWeb3
        console.log('registerWeb3Instance', result)
        commit('registerWeb3Instance', result)
      } catch (err) {
        console.log('error in action registerWeb3', err)
      }
    },
    async getContractInstance ({ commit }) {
      try {
        const result = await getContract
        commit('registerContractInstance', result)
      } catch (err) {
        console.log('error in action getContractInstance', err)
      }
    },
  },
})
