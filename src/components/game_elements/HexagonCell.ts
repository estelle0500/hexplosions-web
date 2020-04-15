const radius = 50
const cellHalfHeight = radius * Math.sin(Math.PI / 3.0)
const cellHeight = cellHalfHeight * 2

export default class HexagonCell {
    sides: number = 6
    radius: number = radius
    stroke: string = 'red'
    strokeWidth: number = 2
    rotation: number = 30
    x: number = 0
    y: number = 0
    id: {
      // Represents units of displacement from grid center
      gridX: number,
      gridY: number
    }

    constructor (id: { gridX: number, gridY: number }) {
      this.id = id
    }

    // Recalculates x, y position relative to the grid center,
    // using the cell height as the unit length of the grid
    SetRelativePosition (gridCenter: { x: number, y: number }) {
      this.x = gridCenter.x + cellHeight * this.id.gridX
      this.y = gridCenter.y + cellHalfHeight * this.id.gridY
    }

    SetRadius (radius: number) {
      this.radius = radius
    }

    mouseover () {
      this.strokeWidth = 6
    }

    mouseleave () {
      this.strokeWidth = 2
    }
}
