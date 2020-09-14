<template>
  <div class="row">
    <div class="col-md-12 text-center">
      <h3>
        <p>{{ game.hours }}</p>
        <p>{{ game.minutes }}</p>
        <p>{{ game.seconds }}</p>
      </h3>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created () {
    this.executing()
  },
  computed: {
    ...mapState(['game'])
  },
  methods: {
    executing () {
      let s = parseInt(this.game.seconds)
      let m = parseInt(this.game.minutes)
      let h = parseInt(this.game.hours)
      if (this.game.pause === false) {
        this.game.time = setInterval(() => {
          if (!this.game.pause) {
            if (s === 59) {
              s = 0
              m++
              if (m === 60) h++
            } else {
              s++
            }
            this.game.hours = ((h < 10) ? '0' : '') + h
            this.game.minutes = ((m < 10) ? '0' : '') + m
            this.game.seconds = ((s < 10) ? '0' : '') + s
          }
        }, 1000)
      } else {
        this.game.pause = true
      }
    }
  }
}
</script>

<style scoped>
  h3{
    padding: 10px;
    background: green;
    border-radius: 4px;
    text-align: center;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  }
  p{
    margin: 5px;
    padding: 10px;
    background: #000;
    border-radius: 4px;
    color: white;
    font-size: 12px;
  }
</style>
