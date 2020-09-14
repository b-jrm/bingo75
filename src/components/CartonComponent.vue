<template>
  <div class="row mx-0">
    <div class="col-md-12 pt-2 border text-center">
      <div class="row">
        <div class="col-md-12">
          <button type="button" v-if="game.sequence.length <= 3" @click="bingo()" class="btn btn-success btn-block" disabled>BINGO!!</button>
          <button type="button" v-if="game.sequence.length > 3" @click="bingo()" class="btn btn-success btn-block">BINGO!!</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h3>CARTON: {{ game.structureCarton[position].carton }}</h3>
          <div :id="'carton_' + carton" class="back-bingo mt-2 mb-2">
            <div v-for="(column,index) in game.structureCarton[position].series" :key="index" class="column-bingo">
              <div class="title-letter text-center">{{ column.letter }}</div>
              <div v-for="(ser,n) in column.numbers" :key="n" :class="(ser.active == true ? 'active' : '')" class="min-frame" @click="thisActive(column.letter + ser.number,index,n)">{{ ser.number }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['position'],
  data () {
    return {
      carton: 0,
      completed: []
    }
  },
  // Llenar bingo con números aleatorios
  created () {
    const numberC = this.getRandom(100, 1000)
    this.game.numberscartons.push(numberC)
    this.carton = numberC
    let letter = ''
    const statusSeries = []
    for (let i = 0; i < this.table.length; i++) {
      const series = []
      const statusNumbers = []
      letter = this.table[i].letter
      const min = this.table[i].range[0]
      const max = this.table[i].range[(this.table[i].range.length - 1)]
      series.push(letter)
      let row = 5
      const column = this.getColumn(i)
      while (series.length < 6) {
        const number = this.getRandom(min, max)
        const repeat = this.validate(series, number)
        if (!repeat) {
          series.push(number)
          if (i === 2 && statusNumbers.length === 2) {
            statusNumbers.push({
              number: 'BW',
              active: true,
              coordinate: row + column
            })
          } else {
            statusNumbers.push({
              number: number,
              active: false,
              coordinate: row + column
            })
          }
          row--
        }
      }
      if (this.completed.length === 2) {
        series[3] = 'BW'
      }
      statusSeries.push({
        letter: letter,
        numbers: statusNumbers
      })
      this.completed.push(series)
      this.game.cartons.push(series)
    }
    if (this.game.structureCarton.length <= 1) {
      this.game.structureCarton.push(
        {
          carton: this.carton,
          series: statusSeries
        }
      )
    }
    this.game.seriesPlayer.push([])
    this.game.coordinatesActive.push([])
    return this.completed
  },
  computed: {
    ...mapState(['game', 'sound', 'table', 'coordinatesNatives'])
  },
  methods: {
    // retornar columna A,B,C,D,E de acuerdo a recorrido de for
    getColumn (index) {
      let result = ''
      switch (index) {
        case 0: result = 'A'; break
        case 1: result = 'B'; break
        case 2: result = 'C'; break
        case 3: result = 'D'; break
        case 4: result = 'E'; break
      }
      return result
    },
    // Validar numeros repetidos en la serie
    validate (series, number) {
      let repeat = false
      for (let i = 0; i < series.length; i++) {
        if (!repeat) {
          if (series[i] === number) {
            repeat = true
          }
        }
      }
      return repeat
    },
    // Obtener un número aleatorio entre un rango
    getRandom (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // Activar o no un numero del bingo de acuerdo al clic del usuario
    thisActive (tiro, indexSerie, indexNumber) {
      const find = tiro.indexOf('BW')
      if (find < 0) {
        const status = this.game.structureCarton[this.position].series[indexSerie].numbers[indexNumber].active
        this.game.structureCarton[this.position].series[indexSerie].numbers[indexNumber].active = !status
        if (this.game.structureCarton[this.position].series[indexSerie].numbers[indexNumber].active) {
          this.game.seriesPlayer[this.position].push(tiro)
          this.game.coordinatesActive[this.position].push(this.game.structureCarton[this.position].series[indexSerie].numbers[indexNumber].coordinate)
        } else {
          const indexFindserie = this.game.seriesPlayer[this.position].indexOf(tiro)
          if (indexFindserie >= 0) {
            this.game.seriesPlayer[this.position].splice(indexFindserie, 1)
          }
          const indexFindcoordinate = this.game.coordinatesActive[this.position].indexOf(this.game.structureCarton[this.position].series[indexSerie].numbers[indexNumber].coordinate)
          if (indexFindcoordinate >= 0) {
            this.game.coordinatesActive[this.position].splice(indexFindcoordinate, 1)
          }
        }
      }
    },
    bingo () {
      this.sound.serie = ''
      const resultValidated = []
      // Recorrido de coordenadas de los bingos ganadores
      for (var i in this.game.mode.coordinates) {
        let countTrue = 0 // Contador de cordenadas validas
        // Objeto de validación, resultado de cada bingo ganador
        const validation = {
          posMode: i, // Posición del recorrido del bingo ganador recorrido
          win: false, // Coincide con el bingo ganador?
          coor: [] // Arreglo de SI o NO coincide cada cordenada con las series Y = Si, N = No
        }
        // Recorrido de cada bingo ganador
        for (var n in this.game.mode.coordinates[i]) {
          // Si la coordenada es central, hace parte del bingo ganador por defecto es valida
          if (this.game.mode.coordinates[i][n] === '3C') {
            countTrue++
            validation.coor.push('Y')
          } else {
            const pos = this.game.coordinatesActive[this.position].indexOf(this.game.mode.coordinates[i][n])
            if (pos >= 0) {
              // Buscar en la secuencia de series del juego la serie del jugador en la coordenada dada
              const findSer = this.game.sequence.includes(this.game.seriesPlayer[this.position][pos])
              if (findSer) {
                countTrue++
                validation.coor.push('Y')
              } else {
                validation.coor.push('N')
              }
            } else {
              validation.coor.push('N')
            }
          }
        }
        // Validación si la cantidad de coordenadas validas es igual al modo de juego original
        if (countTrue === this.game.mode.coordinates[i].length) {
          this.game.countWinner++ // Aumentar en 1 la cantidad de formas validas en que se ha ganado
          validation.win = true // El carton de juego del bingo recorrido es ganador
        } else {
          validation.win = false // El carton de juego del bingo recorrido no es valido
        }
        // Agregar el objeto resultanto en el arreglo de resultados por cada bingo ganador recorrido
        resultValidated.push(validation)
      }
      if (this.game.countWinner > 0) {
        this.game.final = true
        this.sound.win = 'winner_male'
      } else {
        this.game.final = false
        this.sound.win = 'losser_male'
      }
      this.game.pause = true
      this.game.result = resultValidated
    }
  }
}
</script>

<style scoped>
  transition-group{
    width: 100%;
    height: 100%;
  }
  .back-bingo{
    width: 250px;
    height: 320px;
    padding: 10px;
    background-color: #A12929;
    border-radius: 10px;
    align-self: center;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    box-shadow: 2px 1px 1px 1px #ccc;
  }
  .column-bingo, .frame-title-bingo{
    border-radius: 10px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }
  .min-frame{
    width: 30px;
    height: 30px;
    border-radius: 10px;
    background-color: #C18C1A;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    font-weight: normal;
    font-size: auto;
    color: #fff;
    cursor: pointer;
    transition: all .5s;
  }
  .title-letter{
    font-size: 30px;
    font-weight: bold;
    color: #fff;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
  .active{
    background-color: rgba(0,0,0,0.5);
    color: #000;
  }
</style>
