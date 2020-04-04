<template>
  <v-stage :config="configKonva">
    <v-layer>
      <v-regular-polygon v-for="polygon in polygons" :key="polygon.id" :config="polygon"
        v-on:mouseover="polygon.mouseover(polygon)" v-on:mouseleave="polygon.mouseleave(polygon)">
      </v-regular-polygon>
    </v-layer>
  </v-stage>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

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

@Component
export default class Grid extends Vue {
  configKonva = {
    width: window.innerWidth,
    height: window.innerHeight,
    container: '#stage'
  }
  polygons: HexagonCell[] = []
  gridSize: number = 5
  created () {
    console.log(this.configKonva.width, this.configKonva.height)

    this.polygons = this.CreateGridMiddleColumn()
  }
  CreateGridMiddleColumn (): HexagonCell[] {
    const kHexCellHalfHeight = HexagonCell.defaultRadius * Math.sin(Math.PI / 3.0)
    console.log(kHexCellHalfHeight)
    const kHexCellHeight = kHexCellHalfHeight * 2

    let topCellY = this.configKonva.height / 2 - (this.gridSize - 1) * kHexCellHalfHeight
    let middleColumn: HexagonCell[] = []
    for (let i = 0; i < this.gridSize; ++i) {
      let x = this.configKonva.width / 2.0
      let y = topCellY + kHexCellHeight * i
      console.log(x, y)
      middleColumn.push(new HexagonCell(i, x, y))
    }
    return middleColumn
  }
}
</script>
