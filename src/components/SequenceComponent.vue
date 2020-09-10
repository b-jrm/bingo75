<template>
  <div class="row">
    <div class="col-md-12">
      <ul>
        <transition-group name="slide-fade" mode="out-in">
          <li v-for="(n, i) in game.sequence.slice().reverse()" :key="i">
            {{ n }}
          </li>
        </transition-group>
      </ul>
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
  ul{
    display: flex;
    width: 100%;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
  ul li{
    display: block;
    margin: 5px;
    padding: 5px;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    background: rgba(0,0,0,0.3);
    font-size: 10px;
    font-weight: bold;
    border: 1px solid #ccc;
    color: white;
  }
  ul li:first-child {
    transform: scale(1.5);
    font-size: 12px;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to{
    opacity: 0;
  }
</style>
