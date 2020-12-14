<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >

    <base-material-card
      icon="mdi-clipboard-text"
      title="Transactions"
      class="px-5 py-3"
    >
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              ID
            </th>
            <th class="primary--text">
              Date
            </th>
            <th class="primary--text">
              Transaction
            </th>
            <th class="primary--text">
              Amount
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>4</td>
            <td>2020. 12. 01</td>
            <td>지난 글쓰기에 대한 토큰 지급</td>
            <td>+ 10</td>
          </tr>

          <tr>
            <td>3</td>
            <td>2020. 12. 03</td>
            <td>투표 참여</td>
            <td>- 5</td>
          </tr>
          <tr>
            <td>2</td>
            <td>2020. 12. 04</td>
            <td>지난 글쓰기에 대한 토큰 지급</td>
            <td>+ 10</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2020. 12. 06</td>
            <td>투표 참여</td>
            <td>- 10</td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>

  </v-container>
</template>
