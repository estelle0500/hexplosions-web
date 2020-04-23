<template>
   <div id="stage_container" v-resize="onResize">
    <div id="information_display">
      <div class="turn_display" v-for="playerId of Array(numPlayers).keys()" :key="playerId"
        :style="{ color: playerColors[playerId], ...opacity(playerId) }">
        PLAYER {{ playerId + 1 }}'S TURN
      </div>
      <div v-if="hasMoveError" id="error_display">
      THAT CELL ISN'T OCCUPIED BY YOU!
      </div>
    </div>

    <v-stage :config="configKonva" ref="stage">
      <v-layer>
      <HexagonCell ref="gridCells" v-for="[index, cell] of engine.gridLocations.entries()"
        :key="index"
        v-bind:gridX="cell.gridX"
        v-bind:gridY="cell.gridY"
        v-bind:maxAtoms="cell.numNeighbors"
        v-bind:playerTurn="engine.playerTurn"
        v-on:completed-turn="engine.updateTurns()"
        v-on:explode="engine.explodeCell($refs.gridCells[index])"
        v-on:illegal-move="onMoveError()">
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
.turn_display {
  text-align: left;
  padding: 0 10px;
  font-size: 1.7em;
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
import Engine from './game_elements/Engine'
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
  playerColors = playerColors
  hasMoveError: boolean = false
  engine: Engine = new Engine()

  @Prop({ default: 5 })
  gridSize!: number
  @Prop({ default: 4 })
  numPlayers!: number

  mounted () {
    this.engine.setup(this.numPlayers, this.gridSize)
    this.$nextTick(this.setCellPositions)
  }

  updated () {
    this.engine.setGridCells(this.$refs.gridCells as HexagonCell[])
  }

  onResize () {
    this.configKonva.width = this.$el.clientWidth
    this.configKonva.height = this.$el.clientHeight
    this.setCellPositions()
  }

  setCellPositions () {
    const stageX = this.configKonva.width / 2
    const stageY = this.configKonva.height / 2
    const stageCenter = { x: stageX, y: stageY }

    for (let cell of (this.$refs.gridCells as HexagonCell[])) {
      cell.setRelativePosition(stageCenter)
    }
  }

  opacity (playerId: number) {
    if (playerId === this.engine.playerTurn) {
      return {
        opacity: 1.0
      }
    } else {
      return {
        opacity: 0.3
      }
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
