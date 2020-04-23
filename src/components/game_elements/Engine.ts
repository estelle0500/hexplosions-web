import HexagonCell from './HexagonCell.vue'

const hexDirections = [
  { x: 1, y: 1 },
  { x: 1, y: -1 },
  { x: 0, y: 2 },
  { x: 0, y: -2 },
  { x: -1, y: 1 },
  { x: -1, y: -1 }
]

class Engine {
  numPlayers: number = 0
  gridSize: number = 0
  playerTurn: number = 0

  gridLocations: {}[] = []
  gridCells: HexagonCell[] = []
  explosionQueue: Set<HexagonCell> = new Set()

  setup (numPlayers: number, gridSize: number) {
    this.numPlayers = numPlayers
    this.gridSize = gridSize
    this.gridLocations = this.createGrid()
    this.populateNeighbors()
  }

  setGridCells (gridCells: HexagonCell[]) {
    this.gridCells = gridCells
  }

  createGrid (): {}[] {
    let grid = []

    // Left half
    for (let gridX = -1; gridX > -this.gridSize; gridX--) {
      const endY = gridX + this.gridSize - 1
      for (let gridY = -endY; gridY <= endY; gridY += 2) {
        grid.push({ gridX, gridY, numNeighbors: 0 })
      }
    }

    // Middle column
    for (let gridY = 1 - this.gridSize; gridY <= this.gridSize - 1; gridY += 2) {
      grid.push({ gridX: 0, gridY, numNeighbors: 0 })
    }

    // Right half
    for (let gridX = 1; gridX < this.gridSize; gridX++) {
      const endY = this.gridSize - gridX - 1
      for (let gridY = -endY; gridY <= endY; gridY += 2) {
        grid.push({ gridX, gridY, numNeighbors: 0 })
      }
    }
    return grid
  }

  updateTurns () {
    if (this.explosionQueue.size > 0) {
      this.explodeCells()
      setTimeout(this.updateTurns.bind(this), 200)
      return
    }
    ++this.playerTurn
    this.playerTurn %= this.numPlayers
  }

  populateNeighbors () {
    for (let cellLocation of this.gridLocations) {
      for (const direction of hexDirections) {
        const isNeighbor = this.gridLocations.some((element: any) =>
          element.gridX === (cellLocation as any).gridX + direction.x &&
          element.gridY === (cellLocation as any).gridY + direction.y
        )

        if (isNeighbor) {
          (cellLocation as any).numNeighbors++
        }
      }
    }
  }

  explodeCell (cell: HexagonCell) {
    this.explosionQueue.add(cell)
  }

  explodeCells () {
    const criticalCells = Array(...this.explosionQueue)
    this.explosionQueue.clear()

    criticalCells.forEach((cell) => {
      // @ts-ignore TODO: find out why typescript won't detect HexagonCell's methods
      cell.explode()
    })
    criticalCells.forEach(this.updateNeighbors.bind(this))
  }

  updateNeighbors (cell: HexagonCell) {
    for (let direction of hexDirections) {
      // @ts-ignore
      const x = cell.gridX + direction.x
      // @ts-ignore
      const y = cell.gridY + direction.y
      const neighborIndex = this.gridCells.findIndex(
        (element: any) => element.gridX === x && element.gridY === y
      )

      if (neighborIndex !== -1) {
        // @ts-ignore
        this.gridCells[neighborIndex].addAtom()
      }
    }
  }
}

export default Engine
