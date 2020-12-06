<template>
  <v-main>
    <!--v-app-bar flat>
      <v-col
        cols="4"
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <span></span>
      </v-col>
      <v-col cols="4" />
      <v-col
        cols="4"
        class="d-flex flex-row-reverse"
      >
          <v-icon
            @click="enableMetamask()"
            x-large
          >
            mdi-account-circle
          </v-icon>
      </v-col>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer-->
    <router-view />

    <!-- dashboard-core-footer / -->
  </v-main>
</template>

<script>
  // import Web3 from 'web3';

  import getWeb3 from '@/utils/getWeb3'
  import { NETWORKS } from '@/utils/networks'

  export default {
    name: 'DashboardCoreView',
    components: {
      // DashboardCoreFooter: () => import('./Footer'),
    },
    data: function () {
      return {
        drawer: false,
        group: null,
        web3s: undefined,
        metamask: 'Unable to connect Metamask',
      }
    },
    created: async function () {
      await this.registerWeb3()
      this.isMetamask()
    },
    methods: {
      isMetamask: function () {
        if ((this.web3s.injectedWeb3) && (NETWORKS[this.web3s.networkId] === 'Ropsten test network')) {
          this.metamask = 'Connected'
        } else {
          this.metamask = 'Unable to connect Metamask'
        }
      },
      registerWeb3: async function () {
        this.metamask = 'Connecting...'

        this.web3s = await getWeb3

        try {
          // alert(this.web3s.injectedWeb3);
          // alert(NETWORKS[this.web3s.networkId]);
        } catch (err) {
          alert(err)
        }

        this.isMetamask()
      },
      enableMetamask: async function () {
        await window.ethereum.enable()
      },
    },
  }
</script>
