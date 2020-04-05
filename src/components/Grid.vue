<template>
   <div id="stage_container" v-resize.initial="ignoreResize" v-resize="onResize">
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
// @ts-ignore
import resize from 'vue-resize-directive'

class HexagonCell {
    sides: number = 6
    static defaultRadius: number = 50
    radius: number = HexagonCell.defaultRadius
    stroke: string = 'red'
    strokeWidth: number = 2
    rotation: number = 30
    x: number
    y: number
    id: number
    constructor (id: number, x: number, y: number) {
      this.x = x
      this.y = y
      this.id = id
    }
    mouseover () {
      this.strokeWidth = 5
    }
    mouseleave () {
      this.strokeWidth = 2
    }
}

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
  ignoreResize () {

  }
  onResize () {
    console.log(this.$el.clientHeight)
    this.configKonva.width = this.$el.clientWidth
    this.configKonva.height = this.$el.clientHeight
    this.polygons = this.CreateGridMiddleColumn()
  }
  CreateGridMiddleColumn (): HexagonCell[] {
    const kHexCellHalfHeight = HexagonCell.defaultRadius * Math.sin(Math.PI / 3.0)
    const kHexCellHeight = kHexCellHalfHeight * 2

    let topCellY = this.configKonva.height / 2.0 - (this.gridSize - 1) * kHexCellHalfHeight
    let middleColumn: HexagonCell[] = []
    for (let i = 0; i < this.gridSize; ++i) {
      let x = this.configKonva.width / 2.0
      let y = topCellY + kHexCellHeight * i
      middleColumn.push(new HexagonCell(i, x, y))
    }
    return middleColumn
  }
}
</script>
