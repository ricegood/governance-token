<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <base-material-card
          color="success"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div
              @click="dialog = true"
              class="display-2 font-weight-bold"
            >
              야식 요일 투표하자
              <!-- (#{{ballot.header.index}}) {{ ballot.body.title }} -->
              <v-chip
                color="secondary"
                style="height:25px; padding: 10px 10px 10px 10px; margin: 0px 10px 0px 10px;"
              >
                #진행중
              </v-chip>
            </div>

            <div class="subtitle-1 font-weight-light">
              to 15 December, 2020
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items"
            />
          </v-card-text>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <base-material-card
          color="grey"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div
              class="display-2 font-weight-bold"
            >
              야식 요일 투표하자
              <!-- (#{{ballot.header.index}}) {{ ballot.body.title }} -->
              <v-chip
                color="black"
                style="height:25px; padding: 10px 10px 10px 10px; margin: 0px 10px 0px 10px;"
              >
                #종료됨
              </v-chip>
            </div>

            <div class="subtitle-1 font-weight-light">
              to 8 December, 2020
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items"
            />
          </v-card-text>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <base-material-card
          color="grey"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div
              class="display-2 font-weight-bold"
            >
              야식 요일 투표하자
              <!-- (#{{ballot.header.index}}) {{ ballot.body.title }} -->
              <v-chip
                color="black"
                style="height:25px; padding: 10px 10px 10px 10px; margin: 0px 10px 0px 10px;"
              >
                #종료됨
              </v-chip>
            </div>

            <div class="subtitle-1 font-weight-light">
              to 1 December, 2020
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items"
            />
          </v-card-text>
        </base-material-card>
      </v-col>

    <!-- Dialog -->

    <v-dialog
      v-model="dialog"
      max-width="800"
    >
      <v-card class="text-center">
        <v-card-title>

          <v-spacer />

          <v-icon
            aria-label="Close"
            @click="dialog = false"
          >
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
      <v-col
        cols="12"
        md="12"
      >
        <base-material-card class="px-5 py-3">
          <template v-slot:heading>
            제목
          </template>

              <v-card-text>
                <template v-for="(task, i) in tasks[0]">
                  <v-row
                    :key="i"
                    align="center"
                  >
                    <v-col cols="1">
                      <v-list-item-action>
                        <v-checkbox
                          v-model="task.value"
                          color="secondary"
                        />
                      </v-list-item-action>
                    </v-col>

                    <v-col cols="9">
                      <div
                        class="font-weight-light"
                        v-text="task.text"
                      />
                    </v-col>

                    <v-col
                      cols="2"
                      class="text-right"
                    >
                      <v-icon class="mx-1">
                        mdi-pencil
                      </v-icon>
                      <v-icon
                        color="error"
                        class="mx-1"
                      >
                        mdi-close
                      </v-icon>
                    </v-col>
                  </v-row>
                </template>
              </v-card-text>
        </base-material-card>
        <v-btn
          block
          color="primary"
          elevation="2"
        >
          진짜? 라고 생각하신다면 여기를 클릭해주십시오
        </v-btn>
      </v-col>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="error"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        dialog: false,
        headers: [
          {
            sortable: false,
            text: 'Rank',
            value: 'id',
          },
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
          {
            sortable: false,
            text: 'V',
          },
        ],
        items: [
          {
            id: 1,
            name: '월요일',
            amount: '35,738',
          },
          {
            id: 2,
            name: '화요일',
            amount: '15,233',
          },
          {
            id: 3,
            name: '수요일',
            amount: '5,124',
          },
          {
            id: 4,
            name: '목요일',
            amount: '3,333',
          },
          {
            id: 5,
            name: '금요일',
            amount: '1,227',
          },
        ],
        tabs: 0,
        tasks: {
          0: [
            {
              text: '300동',
              value: true,
            },
            {
              text: '301동',
              value: false,
            },
            {
              text: '302동',
              value: false,
            },
          ],
          1: [
            {
              text: '시나몬 스테이크',
              value: true,
            },
            {
              text: '불고기 백반',
              value: false,
            },
          ],
          2: [
            {
              text: '야식을 꼭 먹어야할까?',
              value: false,
            },
            {
              text: '피자?',
              value: true,
            },
            {
              text: '닭강정?',
              value: true,
            },
          ],
        },
        list: {
          0: false,
          1: false,
          2: false,
        },
      }
    },

    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
    },
  }
</script>
