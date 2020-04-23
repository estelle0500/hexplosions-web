class Engine {
  numPlayers: number = 0
  gridSize: number = 0
  playerTurn: number = 0

  setup (numPlayers: number, gridSize: number) {
    this.numPlayers = numPlayers
    this.gridSize = gridSize
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

  updateTurns () {
    ++this.playerTurn
    this.playerTurn %= this.numPlayers
  }
}

export default Engine
