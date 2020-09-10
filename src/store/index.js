import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    namespaced: true,
    sound: {
      serie: '', // Audio dinamico de cada serie del juego en curso
      start: 'sounds/start_male.mp3', // Mensaje al iniciar un juego
      win: '' // Mansaje resultado ganador/perdedor
    },
    game: {
      status: false, // Estado de un juego
      start: false, // Inicia un juego
      pause: false, // Pausa el juego en curso
      round: false, // Habilita la bola de bingo
      countCartons: 0, // Cantidad de cartones en juego
      numberscartons: [], // Numero de cartones
      cartons: [], // Coordenadas de cartones en juego
      structureCarton: [
        // Structure´s Example
        // {
        //     carton: '',
        //     series: [
        //         {
        //             letter: '',
        //             numbers: [
        //                 { number: 0, active: false, coordinate: '' }
        //             ]
        //         },
        //     ]
        // }
      ],
      market: [
        // Structure´s table
        {
          letter: 'B',
          range: [
            { number: 1, active: false },
            { number: 2, active: false },
            { number: 3, active: false },
            { number: 4, active: false },
            { number: 5, active: false },
            { number: 6, active: false },
            { number: 7, active: false },
            { number: 8, active: false },
            { number: 9, active: false },
            { number: 10, active: false },
            { number: 11, active: false },
            { number: 12, active: false },
            { number: 13, active: false },
            { number: 14, active: false },
            { number: 15, active: false }
          ]
        },
        {
          letter: 'I',
          range: [
            { number: 16, active: false },
            { number: 17, active: false },
            { number: 18, active: false },
            { number: 19, active: false },
            { number: 20, active: false },
            { number: 21, active: false },
            { number: 22, active: false },
            { number: 23, active: false },
            { number: 24, active: false },
            { number: 25, active: false },
            { number: 26, active: false },
            { number: 27, active: false },
            { number: 28, active: false },
            { number: 29, active: false },
            { number: 30, active: false }
          ]
        },
        {
          letter: 'N',
          range: [
            { number: 31, active: false },
            { number: 32, active: false },
            { number: 33, active: false },
            { number: 34, active: false },
            { number: 35, active: false },
            { number: 36, active: false },
            { number: 37, active: false },
            { number: 38, active: false },
            { number: 39, active: false },
            { number: 40, active: false },
            { number: 41, active: false },
            { number: 42, active: false },
            { number: 43, active: false },
            { number: 44, active: false },
            { number: 45, active: false }
          ]
        },
        {
          letter: 'G',
          range: [
            { number: 46, active: false },
            { number: 47, active: false },
            { number: 48, active: false },
            { number: 49, active: false },
            { number: 50, active: false },
            { number: 51, active: false },
            { number: 52, active: false },
            { number: 53, active: false },
            { number: 54, active: false },
            { number: 55, active: false },
            { number: 56, active: false },
            { number: 57, active: false },
            { number: 58, active: false },
            { number: 59, active: false },
            { number: 60, active: false }
          ]
        },
        {
          letter: 'O',
          range: [
            { number: 61, active: false },
            { number: 62, active: false },
            { number: 63, active: false },
            { number: 64, active: false },
            { number: 65, active: false },
            { number: 66, active: false },
            { number: 67, active: false },
            { number: 68, active: false },
            { number: 69, active: false },
            { number: 70, active: false },
            { number: 71, active: false },
            { number: 72, active: false },
            { number: 73, active: false },
            { number: 74, active: false },
            { number: 75, active: false }
          ]
        }
      ],
      autoSelect: 'No',
      autoRound: 'No',
      mode: {
        type: '',
        coordinates: []
      }, // Coordenadas del modo de bingo ganador (Nombre/Coordenadas)
      hours: '00', // Horas de duración del juego
      minutes: '00', // Minutos de duración del juego
      seconds: '00', // Segundos de duración del juego
      time: null, // Estado del tiempo (Temporizador)
      serie: '', // Serie actual de juego en curso
      sequence: [], // Secuencia ordenada de series que han salido durante un juego
      seriesPlayer: [], // Series en las que el jugador ha dado clic en el carton
      coordinatesActive: [], // coordenadas en las que el jugador ha dado clic en el carton concatenado con _ con la serie
      result: [], // Arreglo de resultados
      final: null // Resultado final ganador o perdedor
    },
    table: [
      { letter: 'B', range: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
      { letter: 'I', range: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30] },
      { letter: 'N', range: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45] },
      { letter: 'G', range: [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60] },
      { letter: 'O', range: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75] }
    ], // Información del tablero de marcación
    coordinatesNatives: [
      ['5A', '4A', '3A', '2A', '1A'],
      ['5B', '4B', '3B', '2B', '1B'],
      ['5C', '4C', '3C', '2C', '1C'],
      ['5D', '4D', '3D', '2D', '1D'],
      ['5E', '4E', '3E', '2E', '1E']
    ], // Coordenadas obligatorias de cada carton
    modes: [
      {
        type: 'Letra A',
        coordinates: [
          ['5A', '4A', '3A', '2A', '1A', '5B', '3B', '5C', '3C', '5D', '3D', '5E', '4E', '3E', '2E', '1E']
        ]
      },
      {
        type: 'Lleno',
        coordinates: [
          ['5A', '4A', '3A', '2A', '1A', '5B', '4B', '3B', '2B', '1B', '5C', '4C', '3C', '2C', '1C', '5D', '4D', '3D', '2D', '1D', '5E', '4E', '3E', '2E', '1E']
        ]
      },
      {
        type: 'Lineal Horizontal',
        coordinates: [
          ['5A', '5B', '5C', '5D', '5E'],
          ['4A', '4B', '4C', '4D', '4E'],
          ['3A', '3B', '3C', '3D', '3E'],
          ['2A', '2B', '2C', '2D', '2E'],
          ['1A', '1B', '1C', '1D', '1E']
        ]
      },
      {
        type: 'Lineal vertical',
        coordinates: [
          ['1A', '2A', '3A', '4A', '5A'],
          ['1B', '2B', '3B', '4B', '5B'],
          ['1C', '2C', '3C', '4C', '5C'],
          ['1D', '2D', '3D', '4D', '5D'],
          ['1E', '2E', '3E', '4E', '5E']
        ]
      },
      {
        type: 'Linea Diagonal',
        coordinates: [
          ['1A', '2B', '3C', '4D', '5E'],
          ['5A', '4B', '3C', '2D', '1E']
        ]
      }
    ] // Formas de juego (Figuras de bingo ganadores)
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
