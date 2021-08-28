# Design Goal

A protocol for facilitating communication between a visualiser and pathfinding solver.

# Features to Support

- **Visualiser -> Solver** Feature Query

  - Query for built-in operating environments
  - Query for supported algorithms
  - Query for supported map types

- **Visualiser -> Solver** Run Solve Task

  - Run task specifying an algorithm, operating environment, and start/end node

- **Solver -> Visualiser** Return Solve Result

  - Return some sort of an error state when one occurs
