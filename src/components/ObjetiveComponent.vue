<template>
  <div class="row">
    <div class="col-md-12 d-flex flex-wrap justify-content-center">
      <div class="back-bingo m-1" v-for="(coor, i) in types.coordinates" :key="i">
        <div class="column-bingo" v-for="(col, index) in coordinatesNatives" :key="index">
          <div :class="[getSame(coor,col[0])]" data-frame="min-frame" v-bind:data-coor="col[0]"></div>
          <div :class="[getSame(coor,col[1])]" data-frame="min-frame" v-bind:data-coor="col[1]"></div>
          <div :class="[getSame(coor,col[2])]" data-frame="min-frame" v-bind:data-coor="col[2]"></div>
          <div :class="[getSame(coor,col[3])]" data-frame="min-frame" v-bind:data-coor="col[3]"></div>
          <div :class="[getSame(coor,col[4])]" data-frame="min-frame" v-bind:data-coor="col[4]"></div>
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['types'],
  computed: {
    ...mapState(['coordinatesNatives'])
  },
  methods: {
    getSame (type, coor) {
      let style = ''
      for (var i = 0; i < type.length; i++) {
        if (type[i] === coor) {
          style = 'bg-secondary'
        }
      }
      return style
    }
  }
}
</script>

<style scoped>
  .back-bingo{
    width: 60px;
    height: 60px;
    padding: 7px;
    background-color: #ccc;
    border-radius: 2px;
    align-self: center;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    box-shadow: 2px 1px 1px 1px #ccc;
  }
  .column-bingo, .frame-title-bingo{
    border-radius: 2px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }
  div[data-frame="min-frame"]{
    width: 8px;
    height: 8px;
    border-radius: 2px;
    background-color: white;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    font-weight: normal;
    font-size: 8px;
    color: #000;
    cursor: pointer;
  }
  .title-letter{
    font-size: 8px;
    font-weight: bold;
    color: #fff;
  }
  .active{
    background-color: #ccc;
    color: #000;
  }
</style>
