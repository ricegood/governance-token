<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />

    <v-text-field
      :label="$t('search')"
      color="secondary"
      hide-details
      style="max-width: 165px;"
    >
      <template
        v-if="$vuetify.breakpoint.mdAndUp"
        v-slot:append-outer
      >
        <v-btn
          class="mt-n2"
          elevation="1"
          fab
          small
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <div class="mx-3" />

    <v-btn
      class="ml-2"
      min-width="0"
      text
      to="/"
    >
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-badge
            color="red"
            overlap
            bordered
          >
            <template v-slot:badge>
              <span>3</span>
            </template>

            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list
        :tile="false"
        nav
      >
        <div>
          <app-bar-item
            v-for="(n, i) in notifications"
            :key="`item-${i}`"
          >
            <v-list-item-title v-text="n" />
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>

    <!-- If Connected to metamask -->
    <v-btn
      v-if="isInjected"
      class="ml-2"
      min-width="0"
      text
      to="/pages/user"
    >
      <v-avatar
        color="black"
        size="30"
      >
        <span class="white--text">
          {{ coinbase.substring(0, 4) }}
        </span>
      </v-avatar>
    </v-btn>

    <!-- If not Connected to metamask -->
    <v-btn
      v-else
      class="ml-2"
      min-width="0"
      text
    >
      <v-icon
        @click="enableMetamask()"
      >
        mdi-account
      </v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
  // Components
  import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapMutations } from 'vuex'

  // Web3, Metamask
  import getWeb3 from '@/utils/getWeb3'
  import { NETWORKS } from '@/utils/networks'

  export default {
    name: 'DashboardCoreAppBar',

    components: {
      AppBarItem: {
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                }, this.$slots.default)
              },
            },
          })
        },
      },
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      web3s: undefined,
      metamask: 'Unable to connect Metamask',
      notifications: [
        '[2020.12.10] 진행중인 2개의 투표가 있습니다',
        '[2020.12.07] 지난 글쓰기에 대한 거버넌스 토큰이 지급되었습니다',
        '[2020.12.04] 새로운 투표가 등록되었습니다',
      ],
    }),

    computed: {
      ...mapState(['drawer']),
      ...mapState({
        isInjected: state => state.web3.isInjected,
        network: state => NETWORKS[state.web3.networkId],
        coinbase: state => state.web3.coinbase,
        balance: state => state.web3.balance,
      }),
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
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
