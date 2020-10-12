<template>
  <v-container grid-list-xl>
    <v-layout raw wrap>
      <v-switch
        class="ma-4"
        label="Realtime Updates"
        color=blue
        hide-details
        inset
        disabled
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
                @keyup.enter="reloadBallotPage()"
                @click:append="reloadBallotPage()"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card>          
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12>
        <v-card>
          <!-- header -->
          <v-card-title>
            <v-btn
              text
              @click="reloadWithInputBallot(ballot.header.index)"
            >
              (#{{ballot.header.index}}) {{ ballot.body.title }}  <!-- | truncate(64) }} -->
            </v-btn>
          </v-card-title>

          <!-- body -->
          <v-card-text>
            <v-simple-table dense>
              <tbody>
                <tr v-for="(proposal, index) in ballot.body.proposals" :key="index">
                  <td>
                    <span>
                      {{index+1}}. {{ proposal }}  <!-- | truncate(64) }} -->
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
      ballot: {},
      goDark: this.$vuetify.theme.dark
    }
  },
  created: function () {
    this.ballot = this.getBallot(this.$route.params.number);
  },
  methods: {
    getBallot: function (n) {
      return {
        header: {
          index: n
        },
        body: {
          title: "sample ballot N",
          proposals: [
                      "up",
                      "down",
                      "right",
                      "left",
                      "somewhere",
                      "over the rainbow"
                    ]
        }
      }
    },
    reloadWithInputBallot: function (n) {
      this.userInputBallot = n.toString();
      this.reloadBallotPage();
    },
    reloadBallotPage: function () {
      if (this.userInputBallot != "") {
        const n = Number(this.userInputBallot);
        this.$router.push({ name: 'ballot', params: {number: n} });
        this.ballot = this.getBallot(this.$route.params.number);
      }
      this.userInputBallot = "";
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
};
</script>
