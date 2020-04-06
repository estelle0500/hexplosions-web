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
      this.strokeWidth = 6
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
  numPolygons: number = 0

  @Prop({ default: 5 })
  gridSize!: number

  onResize () {
    this.configKonva.width = this.$el.clientWidth
    this.configKonva.height = this.$el.clientHeight

    const middleColumn: HexagonCell[] = this.CreateGridMiddleColumn()
    const leftHalf: HexagonCell[] = this.CreateGridLeftHalf(middleColumn)
    const rightHalf: HexagonCell[] = this.CreateGridRightHalf(middleColumn)
    this.polygons = leftHalf.concat(middleColumn).concat(rightHalf)
  }

  CreateGridMiddleColumn (): HexagonCell[] {
    const kHexCellHalfHeight = HexagonCell.defaultRadius * Math.sin(Math.PI / 3.0)
    const kHexCellHeight = kHexCellHalfHeight * 2

    let topCellY = this.configKonva.height / 2.0 - (this.gridSize - 1) * kHexCellHalfHeight
    let middleColumn: HexagonCell[] = []
    for (let i = 0; i < this.gridSize; ++i) {
      let x = this.configKonva.width / 2.0
      let y = topCellY + kHexCellHeight * i
      middleColumn.push(new HexagonCell(this.numPolygons, x, y))
      ++this.numPolygons
    }
    return middleColumn
  }

  CreateGridLeftHalf (middleColumn: HexagonCell[]): HexagonCell[] {
    let leftHalf: HexagonCell[][] = [middleColumn]
    const kHexCellHalfHeight = HexagonCell.defaultRadius * Math.sin(Math.PI / 3.0)
    const kHexCellHeight = kHexCellHalfHeight * 2

    for (let i = 1; i < this.gridSize; i++) {
      let newColumn: HexagonCell[] = []

      for (const prevColCell of leftHalf[0]) {
        const y = prevColCell.y + kHexCellHalfHeight
        const x = prevColCell.x - kHexCellHeight
        newColumn.push(new HexagonCell(this.numPolygons, x, y))
        ++this.numPolygons
      }

      // Each column has one fewer cell than the previous column
      newColumn.pop()
      leftHalf.unshift(newColumn)
    }

    leftHalf.pop()
    return leftHalf.flat()
  }

  CreateGridRightHalf (middleColumn: HexagonCell[]): HexagonCell[] {
    let rightHalf: HexagonCell[][] = [middleColumn]
    const kHexCellHalfHeight = HexagonCell.defaultRadius * Math.sin(Math.PI / 3.0)
    const kHexCellHeight = kHexCellHalfHeight * 2

    for (let i = 1; i < this.gridSize; i++) {
      let newColumn: HexagonCell[] = []

      for (const prevColCell of rightHalf[0]) {
        const y = prevColCell.y + kHexCellHalfHeight
        const x = prevColCell.x + kHexCellHeight
        newColumn.push(new HexagonCell(this.numPolygons, x, y))
        ++this.numPolygons
      }

      // Each column has one fewer cell than the previous column
      newColumn.pop()
      rightHalf.unshift(newColumn)
    }

    rightHalf.pop()
    return rightHalf.flat()
  }
}
</script>
