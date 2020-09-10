<template>
  <div class="row">
    <div class="col-md-12">
      <table class="text-center" border="1" width="100%" style="font-size: 10px;">
        <thead>
          <tr>
            <th colspan="16">TABLERO DE MARCACION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,index) in game.market" :key="index">
            <th>{{ row.letter }}</th>
            <td :class="(pos.active == true ? 'activeTd' : '')" v-for="(pos,i) in row.range" :key="i">
              {{ row.letter + pos.number }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['game'])
  }
}
</script>

<style scoped>
  .activeTd{
    background: #ccc;
    color: white;
  }
</style>
