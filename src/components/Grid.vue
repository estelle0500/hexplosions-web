<template>
   <div id="stage_container" v-resize="onResize">
    <v-stage :config="configKonva" ref="stage">
        <v-layer>
        <v-regular-polygon v-for="polygon in polygons" :key="polygon.id" :config="polygon"
            @mouseover="polygon.mouseover(polygon)" @mouseleave="polygon.mouseleave(polygon)">
        </v-regular-polygon>
        </v-layer>
    </v-stage>
  </div>
</template>

<style scoped>
#stage_container {
    flex: 1 1 auto;
    overflow: hidden;
}
</style>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import HexagonCell from './game_elements/HexagonCell'
// @ts-ignore
import resize from 'vue-resize-directive'

@Component({
  directives: {
    resize
  }
})
export default class Grid extends Vue {
  configKonva = {
    width: 0,
    height: 0
  }
  polygons: HexagonCell[] = []

  @Prop({ default: 5 })
  gridSize!: number

  mounted () {
    this.polygons = this.CreateGrid()
  }

  onResize () {
    this.configKonva.width = this.$el.clientWidth
    this.configKonva.height = this.$el.clientHeight
    this.SetCellPositions()
  }

  CreateGrid (): HexagonCell[] {
    let grid: HexagonCell[] = []

    // Left half
    for (let gridX = -1; gridX > -this.gridSize; gridX--) {
      const endY = gridX + this.gridSize - 1
      for (let gridY = -endY; gridY <= endY; gridY += 2) {
        grid.push(new HexagonCell({ gridX, gridY }))
      }
    }

    // Middle column
    for (let gridY = 1 - this.gridSize; gridY <= this.gridSize - 1; gridY += 2) {
      grid.push(new HexagonCell({ gridX: 0, gridY }))
    }

    // Right half
    for (let gridX = 1; gridX < this.gridSize; gridX++) {
      const endY = this.gridSize - gridX - 1
      for (let gridY = -endY; gridY <= endY; gridY += 2) {
        grid.push(new HexagonCell({ gridX, gridY }))
      }
    }
    return grid
  }

  SetCellPositions () {
    const stageX = this.configKonva.width / 2
    const stageY = this.configKonva.height / 2
    const stageCenter = { x: stageX, y: stageY }

    for (let cell of this.polygons) {
      cell.SetRelativePosition(stageCenter)
    }
  }
}
</script>
