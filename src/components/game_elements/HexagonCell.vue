<template>
  <div>
    <v-regular-polygon :config="displayConfig" @click="clicked"
      @mouseover="mouseover" @mouseleave="mouseleave">
    </v-regular-polygon>
    <v-text :config="textDisplayConfig" ref="atomsDisplay">
    </v-text>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { playerColors } from './Constants'

const textMinimumSize = 14
const textSizeScale = 4
const radius = 50
const gridUnitX = radius * 1.5
const gridUnitY = radius * Math.sin(Math.PI / 3.0)

@Component({
})
export default class HexagonCell extends Vue {
    displayConfig = {
      sides: 6,
      radius: radius,
      stroke: 'red',
      strokeWidth: 2,
      rotation: 30,
      x: 0,
      y: 0
    }
    textDisplayConfig = {
      x: 0,
      y: 0,
      align: 'center',
      verticalAlign: 'middle',
      fill: 'red',
      text: '',
      fontFamily: 'monospace',
      lineHeight: 0,
      fontSize: textMinimumSize,
      offsetX: 5,
      offsetY: -2
    }

    // Represents units of displacement from grid center
    @Prop()
    gridX!: number
    @Prop()
    gridY!: number
    @Prop()
    playerTurn!: number

    atoms: number = 0
    occupyingPlayer: number = 0

    // Recalculates x, y position relative to the grid center,
    // using the cell height as the unit length of the grid
    setRelativePosition (gridCenter: { x: number, y: number }) {
      this.displayConfig.x = gridCenter.x + gridUnitX * this.gridX
      this.displayConfig.y = gridCenter.y + gridUnitY * this.gridY
      this.textDisplayConfig.x = this.displayConfig.x
      this.textDisplayConfig.y = this.displayConfig.y
    }

    setRadius (radius: number) {
      this.displayConfig.radius = radius
    }

    mouseover () {
      this.displayConfig.strokeWidth = 4
      if (this.isLegalMove()) {
        this.displayConfig.strokeWidth = 8
      }
    }

    mouseleave () {
      this.displayConfig.strokeWidth = 2
      this.displayConfig.stroke = 'red'
    }

    clicked () {
      if (this.isLegalMove()) {
        ++this.atoms
        this.occupyingPlayer = this.playerTurn
        this.updateTextDisplay()
        this.$emit('completed-turn')

        if (this.atoms >= this.displayConfig.sides) {
          this.$emit('explode')
        }

        setTimeout(this.mouseover, 0)
        return
      }
      this.emitErrorMessage()
    }

    isLegalMove () : boolean {
      return this.atoms === 0 || this.playerTurn === this.occupyingPlayer
    }

    updateTextDisplay () {
      this.textDisplayConfig.text = String(this.atoms)
      this.textDisplayConfig.fontSize = textMinimumSize + textSizeScale * this.atoms
      this.textDisplayConfig.fill = playerColors[this.occupyingPlayer]
      setTimeout(this.updateTextPosition, 0)
    }

    updateTextPosition () {
      this.textDisplayConfig.offsetX = (this.$refs.atomsDisplay as any).getNode().width() / 2
      this.textDisplayConfig.offsetY = (this.$refs.atomsDisplay as any).getNode().height() / 2
    }

    emitErrorMessage () {
      this.$emit('illegal-move')
    }
}
</script>
