<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="12"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-bold">
              Proposal
            </div>

            <div class="subtitle-1 font-weight-light">
              투표 생성에는 - 토큰이 필요합니다
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Proposal 1"
                    class="purple-input"
                    v-model="prop1"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Proposal 2"
                    class="purple-input"
                    v-model="prop2"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Proposal 3"
                    class="purple-input"
                    v-model="prop3"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Proposal 4"
                    class="purple-input"
                    v-model="prop4"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="clickButton()"
                  >
                    Submit
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'proposal',
    mounted () {
      console.log('dispatching getContractInstance')
      this.$store.dispatch('getContractInstance')
    },
    data () {
      return {
        // proposal parameters
        prop1: '',
        prop2: '',
        prop3: '',
        prop4: '',
        pending: false,
      }
    },
    methods: {
      clickButton () {
        console.log('button clicked!', this.prop1, this.prop2, this.prop3, this.prop4)
        this.$store.state.contractInstance().createBallot([web3.fromAscii(this.prop1), web3.fromAscii(this.prop2), web3.fromAscii(this.prop3), web3.fromAscii(this.prop4)], {
          gas: 300000,
          value: 0,
          from: this.$store.state.web3.coinbase,
        }, (err, result) => {
          if (err) {
            console.log(err)
            this.pending = false
          } else {
            console.log('createBallot transaction !!!!')
            /*
              let bettingResult = this.$store.state.contractInstance().votingResult()
              // watch => solidity event를 감시
              bettingResult.watch((err, result) => {
                if (err) {
                  console.log('could not get event Won()')
                } else {
                  this.winEvent = result.args
                  this.winEvent.rewards = parseInt(result.args.rewards, 10)
                  console.log(`winEvent: ${result.args}`)
                  this.pending = false
                }
              });
            */
          }
        })
      },
    },
  }
</script>
