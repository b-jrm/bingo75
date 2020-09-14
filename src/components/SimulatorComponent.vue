<template>
    <div class="row">
      <div class="col-md-12">
        <transition name="fade" mode="out-in">
          <!-- CONFIG -->
          <div class="row" key="1" v-if="!game.start && !game.status && !game.pause && game.result.length == 0">
            <div class="col-md-3"></div>
              <div class="col-md-6">
                <div class="card mt-4">
                  <div class="card-header text-center">
                    <h3>SIMULADOR DE BINGO</h3>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-6">
                        <small>Cantidad de cartones:</small>
                        <select class="form-control form-control-sm m-2" v-model.number="game.countCartons" v-on:change="$emit('change', config())">
                            <option value="0" selected>Seleccione ...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                      </div>
                      <div class="col-md-6">
                        <small>Modo de juego:</small>
                        <select class="form-control form-control-sm m-2" v-model="game.mode" v-on:change="$emit('change', config())">
                            <option value="" selected>Seleccione ...</option>
                            <option v-for="(mod,index) in modes" :key="index" :value="mod">{{ mod.type }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 d-flex justify-content-center">
                        <Objetive v-bind:types="game.mode"></Objetive>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <small>¿Selección automática?</small>
                        <select class="form-control form-control-sm m-2" v-model="game.autoSelect" v-on:change="$emit('change', config())" disabled>
                            <option value="">Seleccione ...</option>
                            <option value="No" title="Tu mism@ seleccionas las coincidencias en tu/s carton/es" selected>No</option>
                            <option value="Si" title="Las coincidencias de bingo se seleccionarán automáticamente">Si</option>
                        </select>
                      </div>
                      <div class="col-md-6">
                        <small>¿Series automáticas?</small>
                        <select class="form-control form-control-sm m-2" v-model="game.autoRound" v-on:change="$emit('change', config())" disabled>
                            <option value="">Seleccione ...</option>
                            <option value="No" title="Tendrás un boton para lanzar la proxima serie cuando desees" selected>No</option>
                            <option value="Si" title="La series aparecerán automáticamente cada n segundos">Si</option>
                        </select>
                      </div>
                    </div>
                    <hr>
                  </div>
                  <div class="card-footer d-flex justify-content-center">
                    <button class="btn btn-success" v-if="ready != true" @click="startGame()" disabled>Jugar</button>
                    <button class="btn btn-success" v-if="ready == true" @click="startGame()">Jugar</button>
                  </div>
                </div>
              </div>
            <div class="col-md-3"></div>
          </div>
          <!-- GAME -->
          <div class="row" key="2" v-if="game.start && game.status && !game.pause && game.result.length == 0">
            <div class="col-md-12">
              <audio v-if="game.sequence.length == 0" :src='"@/sounds/start_male.mp3"' autoplay></audio>
              <Market></Market>
              <div class="row text-center">
                <div class="col-md-9 m-0 p-0">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="row d-flex flex-row justify-content-center align-items-center">
                        <div class="col-md-8 d-flex flex-column justify-content-center align-items-center">
                          <div class="row">
                            <div class="col-md-12 m-0 p-5 d-flex justify-content-center">
                              <transition name="bounce" mode="out-in">
                                <div v-if="game.round" class="ball" key="one">
                                  <audio v-if="sound.serie !== ''" :src='"@/sounds/"+sound.serie+".mp3"' autoplay></audio>
                                  {{ game.serie }}
                                </div>
                                <div v-if="!game.round" class="ball" key="two">
                                  <audio v-if="sound.serie !== ''" :src='"@/sounds/"+sound.serie+".mp3"' autoplay></audio>
                                  {{ game.serie }}
                                </div>
                              </transition>
                            </div>
                          </div>
                          <hr>
                          <div class="row p-2">
                            <div class="col-md-12">
                              <button type="button" class="btn btn-primary btn-round" @click="setRound()">Ronda</button>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-4 m-0 p-3 sequence-content">
                          <Sequence></Sequence>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-8 border d-flex flex-row justify-content-center content-cartons">
                        <Carton v-for="(c,i) in game.countCartons" :key="i" v-bind:position="i"></Carton>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 mt-3 p-3 text-center content-cartons">
                  <h6>Bingos ganadores</h6>
                  <Objetive v-bind:types="game.mode"></Objetive>
                  <hr>
                  <div class="row p-2">
                    <div class="col-md-12">
                      <button type="button" class="btn btn-danger" @click="pauseGame()">Pausa</button>
                    </div>
                  </div>
                  <Time v-if="game.start"></Time>
                </div>
              </div>
            </div>
          </div>
          <!-- PAUSED -->
          <div class="row" key="3" v-if="game.start && game.status && game.pause && game.result.length == 0">
            <div class="col-md-12 text-center p-5 d-flex flex-column">
              <h2>JUEGO PAUSADO</h2>
              <br>
              <hr>
              <br>
              <button type="button" class="btn btn-primary" @click="continueGame()">Continuar</button>
              <br>
              <br>
              <br>
              <button type="button" class="btn btn-warning" @click="finishGame()">Salir</button>
            </div>
          </div>
          <!-- FINISHED -->
          <div class="row" key="4" v-if="game.start && game.status && game.pause && game.result.length > 0">
            <div class="col-md-12 text-center p-5 d-flex flex-column">
              <audio v-if="game.final !== null" :src="sound.win" autoplay></audio>
              <h2>JUEGO FINALIZADO</h2>
              <br>
              <Finish></Finish>
              <br>
              <button type="button" v-if="!game.final" class="btn btn-primary btn-block" @click="continueGame()">Continuar juego</button>
              <br>
              <button type="button" class="btn btn-warning btn-block" @click="finishGame()">Nuevo juego</button>
            </div>
          </div>
        </transition>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Objetive from './ObjetiveComponent.vue'
import Sequence from './SequenceComponent.vue'
import Time from './TimeComponent.vue'
import Finish from './FinishComponent.vue'
import Carton from './CartonComponent.vue'
import Market from './MarketComponent.vue'
// Importamos JQuery
const $ = require('jquery')
// Lo declaramos globalmente
window.$ = $
export default {
  data () {
    return {
      ready: false
    }
  },
  created () {
    // console.log(this.sound.start)
  },
  updated () {
    // console.log(this.game)
  },
  components: {
    Objetive,
    Sequence,
    Time,
    Finish,
    Carton,
    Market
  },
  computed: {
    ...mapState(['table', 'modes', 'coordinatesNatives', 'game', 'sound'])
  },
  methods: {
    // Pausar juego (Cuando esta en curso)
    pauseGame () {
      this.game.pause = true
      this.sound.serie = ''
    },
    // Continuar juego (Cuando esta pausado)
    continueGame () {
      this.game.result = []
      this.game.pause = false
      this.sound.win = ''
    },
    // Iniciar juego (Salir del juego)
    startGame () {
      this.game.status = true
      this.game.start = true
    },
    // Finalizar juego (Salir del juego)
    finishGame () {
      // Limpiar variables de objeto game
      this.game.status = false
      this.game.start = false
      this.game.pause = false
      this.game.round = false
      this.game.countCartons = 0
      this.game.numberscartons = []
      this.game.cartons = []
      this.game.structureCarton = []
      for (var i in this.game.market) {
        for (var n in this.game.market[i].range) {
          this.game.market[i].range[n].active = false
        }
      }
      this.game.autoSelect = 'No'
      this.game.autoRound = 'No'
      this.game.mode = {
        type: '',
        coordinates: []
      }
      this.game.hours = '00'
      this.game.minutes = '00'
      this.game.seconds = '00'
      clearInterval(this.game.time)
      this.game.time = null
      this.game.serie = ''
      this.game.sequence = []
      this.game.seriesPlayer = []
      this.game.coordinatesActive = []
      this.game.result = []
    },
    // Validación de los campos de configuración inicial del juego
    config () {
      const count = Object.keys(this.game.mode.coordinates).length
      if (this.game.autoRound !== '' && this.game.autoSelect !== '' && this.game.countCartons > 0 && count > 0) {
        this.ready = true
      } else {
        this.ready = false
      }
    },
    // Lanzamiento de cada ronda
    setRound () {
      $('.btn-round').attr('disabled', true)
      let validate = false
      let number = this.getRandom(1, 75)
      let newRound = this.getLetter(number)
      while (!validate) {
        const found = this.game.sequence.includes(newRound)
        if (!found) {
          validate = true
        } else {
          number = this.getRandom(1, 75)
          newRound = this.getLetter(number)
        }
      }
      this.game.serie = newRound
      this.game.sequence.push(newRound)
      this.findObjectmarket(number)
      this.game.round = !this.game.round
      this.sound.serie = newRound
      setTimeout(() => { $('.btn-round').attr('disabled', false) }, 2000)
    },
    // Buscar el índice de la tabla de marcación segun numero dado en serie de setRound
    findObjectmarket (number) {
      let indexObject = null
      let rest = null
      if (number >= 1 && number <= 15) { indexObject = 0; rest = 1 }
      if (number >= 16 && number <= 30) { indexObject = 1; rest = 16 }
      if (number >= 31 && number <= 45) { indexObject = 2; rest = 31 }
      if (number >= 46 && number <= 60) { indexObject = 3; rest = 46 }
      if (number >= 61 && number <= 75) { indexObject = 4; rest = 61 }
      const indexPosition = number - rest
      this.game.market[indexObject].range[indexPosition].active = !this.game.market[indexObject].range[indexPosition].active
    },
    // Obtener un número aleatorio entre un rango minimo y máximo
    getRandom (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // Obtener un número aleatorio entre un rango de acuerdo al resultado de getRandom
    getLetter (number) {
      let letter = ''
      switch (true) {
        case (number <= 15): letter = 'B' + number; break
        case (number <= 30): letter = 'I' + number; break
        case (number <= 45): letter = 'N' + number; break
        case (number <= 60): letter = 'G' + number; break
        case (number <= 75): letter = 'O' + number; break
      }
      return letter
    }
  }
}
</script>

<style scoped>
  .content-cartons{
    overflow: visible !important;
  }
  /*===================================
    BOLA DE BINGO
  ===================================*/
  .ball{
    width: 100px;
    height: 100px;
    padding: 20px;
    background: #B34F36;
    border-radius: 50%;
    position: relative;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    font-size: 30px;
    font-weight: bold;
  }
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
  .activeTd{
    background: #ccc;
    color: white;
  }
  .sequence-content{
    width: 100px;
    height: 400px;
    max-height: 400px;
    overflow-x: hidden;
    overflow-y: scroll !important;
  }
  .sequence-content::-webkit-scrollbar{
      -webkit-appearance: none;
  }

  .sequence-content::-webkit-scrollbar-thumb {
      background-color: #2D5259;
      border-radius: 20px;
      border: 5px solid #fff;
  }
</style>
