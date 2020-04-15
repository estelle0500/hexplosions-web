<template>
   <div id="stage_container" v-resize="onResize">
    <div id="information_display">
      <div id="turn_display" :style="playerColor">
        PLAYER {{ playerTurn + 1 }}'S TURN
      </div>
      <div v-if="hasMoveError" id="error_display">
      THAT CELL ISN'T OCCUPIED BY YOU!
      </div>
    </div>

    <v-stage :config="configKonva" ref="stage">
      <v-layer>
      <HexagonCell ref="gridCells" v-for="[index, cell] of gridCells.entries()" :key="index"
        v-bind:gridX="cell.gridX" v-bind:gridY="cell.gridY" v-bind:playerTurn="playerTurn"
        v-on:completed-turn="updateTurns" v-on:illegal-move="onMoveError">
      </HexagonCell>
      </v-layer>
    </v-stage>
  </div>
</template>

<style scoped>
#stage_container {
  flex: 1 1 auto;
  overflow: hidden;
}
#information_display {
  float: left;
}
#turn_display {
  text-align: left;
  padding: 10px;
  font-size: 2em;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
}
#error_display {
  color: red;
  padding: 0 10px;
  font-family: 'Courier New', Courier, monospace;
}
</style>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import HexagonCell from './game_elements/HexagonCell.vue'
import { playerColors } from './game_elements/Constants'
// @ts-ignore
import resize from 'vue-resize-directive'

@Component({
  directives: {
    resize
  },
  components: {
    HexagonCell
  }
})
export default class Grid extends Vue {
  configKonva = {
    width: 0,
    height: 0
  }
  gridCells: {}[] = []
  playerTurn = 0
  hasMoveError: boolean = false

  @Prop({ default: 5 })
  gridSize!: number
  @Prop({ default: 2 })
  numPlayers!: number

  mounted () {
    this.gridCells = this.createGrid()
    setTimeout(this.setCellPositions, 0)
  }

  onResize () {
    this.configKonva.width = this.$el.clientWidth
    this.configKonva.height = this.$el.clientHeight
    this.setCellPositions()
  }

  createGrid (): {}[] {
    let grid = []

    // Left half
    for (let gridX = -1; gridX > -this.gridSize; gridX--) {
      const endY = gridX + this.gridSize - 1
      for (let gridY = -endY; gridY <= endY; gridY += 2) {
        grid.push({ gridX, gridY })
      }
    }

    // Middle column
    for (let gridY = 1 - this.gridSize; gridY <= this.gridSize - 1; gridY += 2) {
      grid.push({ gridX: 0, gridY })
    }

    // Right half
    for (let gridX = 1; gridX < this.gridSize; gridX++) {
      const endY = this.gridSize - gridX - 1
      for (let gridY = -endY; gridY <= endY; gridY += 2) {
        grid.push({ gridX, gridY })
      }
    }
    return grid
  }

  setCellPositions () {
    const stageX = this.configKonva.width / 2
    const stageY = this.configKonva.height / 2
    const stageCenter = { x: stageX, y: stageY }

    for (let cell of (this.$refs.gridCells as HexagonCell[])) {
      cell.setRelativePosition(stageCenter)
    }
  }

  boom () {
    console.log('boom')
  }

  updateTurns () {
    ++this.playerTurn
    this.playerTurn %= this.numPlayers
  }

  get playerColor () {
    return {
      color: playerColors[this.playerTurn]
    }
  }

  onMoveError () {
    this.hasMoveError = true
    setTimeout(this.offMoveError, 2000)
  }

  offMoveError () {
    this.hasMoveError = false
  }
}
</script>
