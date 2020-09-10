<template>
    <div class="row">
        <div class="col-md-12 d-flex d-row justify-content-center align-items-center">
            <h6 v-if="game.final" class="text-center">
                <p style="font-size: 15px; font-weight: bolder; color: green;">FELICIDADES, HAS GANADO BINGO!</p>
            </h6>
            <h6 v-if="!game.final" class="text-center">
                <p style="font-size: 15px; font-weight: bolder; color: red;">INTENTALO DE NUEVO O CONTINUA EL JUEGO, EL BINGO NO ES VALIDO!</p>
            </h6>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'finish',
  computed: {
    ...mapState(['game'])
  }
}
</script>
