<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        v-for="(item, index) in items.slice().reverse()"
        cols="12"
        md="4"
      >
        <base-material-card
          v-if="4 + ballotNumber - index >= 7"
          color="success"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div
              class="display-2 font-weight-bold"
            >
              Ballot # {{ ballotNumber - index }}
              <!-- (#{{ballot.header.index}}) {{ ballot.body.title }} -->
              <v-chip
                color="secondary"
                style="height:25px; padding: 10px 10px 10px 10px; margin: 0px 10px 0px 10px;"
              >
                #진행중
              </v-chip>
            </div>

            <div class="subtitle-1 font-weight-light">
              to {{ 4 + ballotNumber - index }} December, 2020
            </div>
          </template>
          <v-card-text>
            <v-data-table
              v-model="selected[ballotNumber - index - 1]"
              :headers="headers"
              :items="item"
              :single-select="singleSelect"
              item-key="id"
              show-select
              hide-default-footer	
            >
            </v-data-table>
            <v-row>
              <v-col
                cols="12"
                md="8"
              >
                <v-text-field
                  v-model="votingValue[ballotNumber - index - 1]"
                  label="voting amount"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-btn
                  rounded
                  color="success"
                  class="mr-0"
                  @click="callVoteFunction(ballotNumber - index - 1)"
                >
                vote
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </base-material-card>
        <base-material-card
          v-else
          color="grey"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div
              class="display-2 font-weight-bold"
            >
              Ballot # {{ ballotNumber - index }}
              <!-- (#{{ballot.header.index}}) {{ ballot.body.title }} -->
              <v-chip
                color="black"
                style="height:25px; padding: 10px 10px 10px 10px; margin: 0px 10px 0px 10px;"
              >
                #종료됨
              </v-chip>
            </div>

            <div class="subtitle-1 font-weight-light">
              to {{ 4 + ballotNumber - index }} December, 2020
            </div>
          </template>
          <v-card-text>
            <v-data-table
              v-model="selected[ballotNumber - index - 1]"
              :headers="headers"
              :items="item"
              :single-select="singleSelect"
              item-key="id"
              show-select
              hide-default-footer	
            >
            </v-data-table>
            <v-row>
              <v-col
                cols="12"
                md="8"
              >
                <v-text-field
                  v-model="votingValue[ballotNumber - index - 1]"
                  label="voting amount"
                  single-line
                  hide-details
                  disable
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-btn
                  rounded
                  disable
                  class="mr-0"
                >
                vote
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        ballotNumber: 0,
        singleSelect: true,
        votingValue: [],
        selected: [],
        headers: [
          {
            sortable: false,
            text: 'Name',
            value: 'name',
          },
          {
            sortable: false,
            text: 'Amount',
            value: 'amount',
            align: 'right',
          },
        ],
        items: [],
      }
    },

    async mounted () {
      console.log('dispatching getContractInstance')
      await this.$store.dispatch('getContractInstance')
      this.getBallotData()
    },

    methods: {
      getBallotData () {
        this.$store.state.contractInstance().LengthOfBallots( {
          gas: 300000,
          value: 0,
          from: this.$store.state.web3.coinbase,
        }, (err, result) => {
          if (err) {
            console.log(err)
            this.pending = false
          } else {
            this.ballotNumber = parseInt(result.toString())
            console.log("ballotNumber = ", this.ballotNumber)
            for (let ballotN = 0; ballotN < this.ballotNumber; ballotN++) {
              let newItem = []
              // [TODO] get length of proposal (=4)
              // get proposal and add to newItem
              for (let proposalN = 0; proposalN < 4; proposalN++) {
                this.$store.state.contractInstance().getterProposals(ballotN, proposalN, {
                  gas: 300000,
                  value: 0,
                  from: this.$store.state.web3.coinbase,
                }, (err, result) => {
                  if (err) {
                    console.log(err)
                    this.pending = false
                  } else {
                    const proposal_name = web3.toAscii(result[0])
                    const proposal_amount = result[1].toString()
                    newItem.push({id: proposalN, name: proposal_name, amount: proposal_amount})
                  }
                })
              }
              // push newItem to items
              this.items.push(newItem)
              this.selected.push([])
              this.votingValue.push([])
            }
          }
        })
      },

      callVoteFunction (ballotN) {
        console.log('Call Ballot#', ballotN, ' Voting Function! selected = ', this.selected[ballotN][0]['id'], 'voting amount = ', this.votingValue[ballotN])
        this.$store.state.contractInstance().vote(ballotN, this.selected[ballotN][0]['id'], {
          gas: 300000,
          value: 0,
          from: this.$store.state.web3.coinbase,
        }, (err, result) => {
          if (err) {
            console.log(err)
            this.pending = false
          } else {
            console.log('callVoteFunction transaction !!!!')
          }
        })
      },
    },
  }
</script>
