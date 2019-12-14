# Note: Work In Progress
# Overview
This is a web port of my CS 126 final project, a game called Hexplosions (based on the mobile game Chain Reaction). Hexplosions is a 2-4 player strategy game played on a hexagonal grid. The objective is to dominate the grid and eliminate all cells of their opponents' color. See [rules](#Rules).

# Play the Game!
link TBA :)

# Rules 
On each player's turn, they can make one of the following moves:
1. Add an atom to an unoccupied cell
2. Add an atom to a cell they already occupy

When the number of atoms in a cell reaches the critical mass (equal to the number of neighbors the cell has), the cell "explodes" and all its atoms are distributed to its neighbors. Hence each neighbor will gain one atom. Note that this may cause the neighbor cells to reach critical mass, causing even more explosions!

The game ends when only one player occupies any cells.