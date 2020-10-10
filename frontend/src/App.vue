<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link :to="{name: 'home',}"
          tag='v-btn'
        >
          <v-btn text>
            <span>CURG</span>
            <span class="font-weight-light"> Governance</span>
          </v-btn>
        </router-link>
      </v-toolbar-title>
      <!-- -->
      <router-link :to="{name: 'ballots',}"
        tag='v-btn'
      >
        <v-btn text>Ballots</v-btn>
      </router-link>
      <router-link :to="{name: 'vote',}"
        tag='v-btn'
      >
        <v-btn text>Vote</v-btn>
      </router-link>
      <v-spacer></v-spacer>

      <!-- Metamask Connect -->
      <v-btn
        text
        @click="enableMetamask()"
        target="_blank"
        color=blue
      >
        <span class="mr-0">
          {{metamask}}
        </span>
      </v-btn>

    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  // import Web3 from 'web3';

  import getWeb3 from './utils/getWeb3';
  import { NETWORKS } from './utils/networks'

  export default {
    data: function () {
      return {
        web3s: undefined,
        metamask: "Unable to connect Metamask",
      }
    },
    created: async function () {
      await this.registerWeb3();
      this.isMetamask();
    },
    methods: {
      isMetamask: function () {
        if ((this.web3s.injectedWeb3) && (NETWORKS[this.web3s.networkId] == 'Ropsten test network')) {
          this.metamask = "Connected";
        }
        else {
          this.metamask = "Unable to connect Metamask";
        }
      },
      registerWeb3: async function () {     
        this.metamask = "Connecting...";
  
        this.web3s = await getWeb3;
        
        try {
          // alert(this.web3s.injectedWeb3);
          // alert(NETWORKS[this.web3s.networkId]);
        } catch (err) {
          alert(err);
        }

        this.isMetamask();
      },
      enableMetamask: async function () {
        await window.ethereum.enable();
      }
    }
  }
</script>
