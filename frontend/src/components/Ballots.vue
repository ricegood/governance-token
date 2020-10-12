<template>
  <v-container grid-list-xl>
    <v-layout raw wrap>
      <v-switch
        class="ma-4"
        label="Realtime Updates"
        v-model=realTimeSwitch
        color=blue
        hide-details
        inset
        @change="getLatestBallots(11)"
      >
      </v-switch>
      <v-spacer></v-spacer>
      <v-switch
        class="ma-4"
        label="Dark Theme"
        v-model=goDark
        color=blue
        hide-details
        inset
        @change="setTheme()"
      >
      </v-switch>
      <v-flex xs12 sm12>
        <v-card color=blue>      
          <v-row>
            <v-col cols="12">
              <v-text-field
                class="ma-4"
                label="Search by Ballot Number"
                append-icon="search"
                solo
                flat
                hide-details
                v-model=userInputBallot
                @keyup.enter="gotoBallotPage()"
                @click:append="gotoBallotPage()"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card>          
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex
        xs12
        sm6
        lg4
        xl3
      >
        <v-btn
          color=blue
          class="white--text font-weight-bold"
          width=100%
          height=100%
          min-height=60px
          @click="gotoCreateBallotPage()"
        >
          <v-icon>
            mdi-plus
          </v-icon>
          <!-- Create Ballot -->
        </v-btn>
      </v-flex>
      <v-flex
        xs12
        sm6
        lg4
        xl3
        v-for="(ballot, index) in ballots"
        :key="index"
      >
        <v-card>
          <!-- header -->
          <v-card-title>
            <v-btn
              text
              @click="gotoWithInputBallot(ballot.header.index)"
            >
              (#{{ballot.header.index}}) {{ ballot.body.title | truncate(36) }}
            </v-btn>
          </v-card-title>

          <!-- body -->
          <v-card-text> 
            <v-simple-table dense>
              <tbody>
                <!-- <tr v-for="(proposal, index) in ballot.body.proposals" :key="index"> -->
                <tr v-for="index in 4" :key="index">
                  <td v-if="index<=ballot.body.proposals.length && index<=3">
                    <span>
                      {{index}}. {{ ballot.body.proposals[index-1] | truncate(36) }}
                    </span>
                  </td>
                  <td v-else-if="ballot.body.proposals.length==4">
                    <span>
                      {{index}}. { ballot.body.proposals[3] | truncate(36) }}
                    </span>
                  </td>
                  <td v-else-if="index<ballot.body.proposals.length&&index<=4">
                    <span>
                      ...
                    </span>
                  </td>
                  <td v-else>
                    <span>
                      <br>
                    </span>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      userInputBallot: "",
      ballots: [],
      realTimeSwitch: false,
      goDark: this.$vuetify.theme.dark
    }
  },
  created: function () {
    this.getLatestBallotsOnce(11);
  },
  methods: {
    getLatestBallots: function (n) {
      /* sample */
      let latest = this.ballots[0].header.index;
      this.ballots = this.ballots.reverse();

      for (let i=latest+1; i<latest+n+1; i++) {
        this.ballots.push({
          header: {
            index: i
          },
          body: {
            title: "sample ballot " + i,
            proposals: [
              "up",
              "down",
              "right",
              "left",
              "HIDDEN"
            ]          }
        });
      }
      this.ballots = this.ballots.reverse();
      this.ballots = this.ballots.slice(0, -1*n);
      return this.ballots;
    },    
    getLatestBallotsOnce: function (n) {
      /* sample */
      for (let i=0; i<n; i++) {
        this.ballots.push({
          header: {
            index: i
          },
          body: {
            title: "sample ballot",
            proposals: [
              "up",
              "down",
              "right",
              "left",
              "HIDDEN"
            ]
          }
        });
      }
      this.ballots = this.ballots.reverse();
      return this.ballots;
    },
    gotoWithInputBallot: function (n) {
      this.userInputBallot = n.toString();
      this.gotoBallotPage();
    },
    gotoBallotPage: function () {
      if (this.userInputBallot != "") {
        const n = Number(this.userInputBallot);
        if (n <= this.ballots[0].header.index) {
          this.$router.push({ name: 'ballot', params: {number: n} });
        }
      }
      this.userInputBallot = "";
    },
    gotoCreateBallotPage: function () {
      this.$router.push({ name: 'createballot' });
    },
    setTheme: function () {
      if (this.goDark == true) {
        return (this.$vuetify.theme.dark = true);
      }
      else {
        return (this.$vuetify.theme.dark = false);
      }
    }
  }
}
</script>
