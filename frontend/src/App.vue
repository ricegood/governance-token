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
      <v-spacer></v-spacer>
      <!-- -->
      <router-link :to="{name: 'ballot',}"
        tag='v-btn'
      >
        <v-btn text>Ballot</v-btn>
      </router-link>
      <router-link :to="{name: 'vote',}"
        tag='v-btn'
      >
        <v-btn text>Vote</v-btn>
      </router-link>
      <!-- -->
      <v-btn
        text
        href="https://github.com/curg/governance-token"
        target="_blank"
        color=blue
      >
        <span class="mr-0">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
</script>
