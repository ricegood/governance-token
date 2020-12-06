<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="emailsSubscriptionChart.data"
          :options="emailsSubscriptionChart.options"
          :responsive-options="emailsSubscriptionChart.responsiveOptions"
          color="#E91E63"
          hover-reveal
          type="Bar"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            야식 요일 투표
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            이번주 야식 언제먹지
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="success"
          hover-reveal
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            투표 참여율
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            <v-icon
              color="green"
              small
            >
              mdi-arrow-up
            </v-icon>
            <span class="green--text">55%</span>&nbsp;
            증가했다 ^^
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-stats-card
          color="black"
          icon="mdi-calendar-month"
          title="이달 완료된 투표 수"
          value="5"
          sub-icon="mdi-calendar"
          sub-text="2020. 12. 01 - 2020. 12. 31"
        />

        <base-material-stats-card
          color="red"
          icon="mdi-face-recognition"
          title="투표 미참여자"
          value="33"
          sub-icon="mdi-alert"
          sub-icon-color="red"
          sub-text="미참여시 다음 투표에 제한이 있습니다"
        />

        <!--base-material-chart-card
          :data="dataCompletedTasksChart.data"
          :options="dataCompletedTasksChart.options"
          hover-reveal
          color="info"
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h3 class="card-title font-weight-light mt-2 ml-2">
            어쩌구저쩌구 투표
          </h3>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            사실 투표를 이렇게 꺾은선으로 나타내지는 않을 것 같기는 한데
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated 26 minutes ago</span>
          </template>
        </base-material-chart-card-->
      </v-col>

      <!--v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="info"
          icon="mdi-twitter"
          title="Followers"
          value="+245"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col-->

      <!-- v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <base-material-stats-card
          color="primary"
          icon="mdi-poll"
          title="진행중인 투표 수"
          value="2"
          sub-icon="mdi-calendar"
          sub-text="2020. 12. 01 - 2020. 12. 31"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <base-material-stats-card
          color="orange"
          icon="mdi-chat-alert"
          title="투표 미참여자"
          value="3"
          sub-icon="mdi-alert"
          sub-icon-color="red"
          sub-text="미참여시 다음 투표에 제한이 있습니다"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <base-material-stats-card
          color="black"
          icon="mdi-calendar-month"
          title="이달 완료된 투표 수"
          value="5"
          sub-icon="mdi-calendar"
          sub-text="2020. 12. 01 - 2020. 12. 31"
        />
      </v-col-->

      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="warning"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              거버넌스 토큰 보유량
            </div>

            <div class="subtitle-1 font-weight-light">
              on 1 December, 2020
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
        md="6"
      >
        <base-material-card class="px-5 py-3">
          <template v-slot:heading>
            <v-tabs
              v-model="tabs"
              background-color="transparent"
              slider-color="white"
            >
              <span
                class="subheading font-weight-light mx-3"
                style="align-self: center"
              >진행중</span>
              <v-tab class="mr-3">
                <v-icon class="mr-2">
                  mdi-brightness-7
                </v-icon>
                점심메뉴
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">
                  mdi-brightness-2
                </v-icon>
                저녁메뉴
              </v-tab>
              <v-tab>
                <v-icon class="mr-2">
                  mdi-emoticon-devil
                </v-icon>
                야식메뉴
              </v-tab>
            </v-tabs>
          </template>

          <v-tabs-items
            v-model="tabs"
            class="transparent"
          >
            <v-tab-item
              v-for="n in 3"
              :key="n"
            >
              <v-card-text>
                <template v-for="(task, i) in tasks[tabs]">
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
            </v-tab-item>
          </v-tabs-items>
        </base-material-card>
        <v-btn
          block
          color="primary"
          elevation="2"
        >
          진짜? 라고 생각하신다면 여기를 클릭해주십시오
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        dailySalesChart: {
          data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
              [12, 17, 7, 17, 23, 18, 38],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        dataCompletedTasksChart: {
          data: {
            labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
            series: [
              [230, 750, 450, 300, 280, 240, 200, 190],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        emailsSubscriptionChart: {
          data: {
            labels: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
            series: [
              [1, 5, 0, 2, 3],

            ],
          },
          options: {
            axisX: {
              showGrid: false,
            },
            low: 0,
            high: 10,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0,
            },
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0]
                },
              },
            }],
          ],
        },
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
        ],
        items: [
          {
            id: 1,
            name: '박상현',
            amount: '35,738',
          },
          {
            id: 2,
            name: '이준모',
            amount: '15,233',
          },
          {
            id: 3,
            name: '김재훈',
            amount: '5,124',
          },
          {
            id: 4,
            name: '김민재',
            amount: '3,333',
          },
          {
            id: 5,
            name: '구연재',
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
