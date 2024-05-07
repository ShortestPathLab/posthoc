---
sidebar_position: 3
---

# Extensions

## Adapters

Adapters implement the [visualiser adapter protocol](.) to connect solvers to Posthoc.

### Built-in adapters

| Name       | URL                     | Connection Type | Description                      |
| ---------- | ----------------------- | --------------- | -------------------------------- |
| Basic Maps | `internal://basic-maps` | Internal        | A collection of basic grid maps. |

### Other adapters

| Name                  | URL                                                                                          | Connection Type | Description                          |
| --------------------- | -------------------------------------------------------------------------------------------- | --------------- | ------------------------------------ |
| Warthog (WebAssembly) | `https://cdn.jsdelivr.net/gh/path-visualiser/app@adapter-warthog-wasm-dist/warthog-wasm.mjs` | Web Worker      | Solver adapter for Warthog & Roadhog |

[You can find more adapters here.](https://github.com/path-visualiser/app)

## Renderers

Renderers are used by the **viewport** view to render visualisations. They're defined by the primitives they support. For example, the **Pixel** renderer supports drawing `rect`, `circle` etc., so any map or search trace that compiles to those primitives can be drawn by **Pixel**. The API for renderers are yet to be finalised. We'll soon let you define custom renderers.

### Built-in renderers

| Name  | URL                      | Connection Type | Description                                                                       |
| ----- | ------------------------ | --------------- | --------------------------------------------------------------------------------- |
| Pixel | `internal://d2-renderer` | Internal        | Comfortably performant 2D renderer. Provides `rect`, `circle`, `path`, `polygon`. |

## Map support

Maps are an escape-hatch from search traces, and allows you to hard-code a visualisation for any filetype.

Posthoc supports the following map formats by default. This list also shows up in **Settings view > Extensions > Map support**. We'll soon let you define custom formats via extensions.

### Built-in map formats

| Format  | Extension         | Description                                                                                                                                                                                                               |
| ------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Grid    | `*.grid`, `*.map` | Moving AI grid map format. [Learn about this format here.](https://movingai.com/benchmarks/formats.html)                                                                                                                  |
| Network | `*.xy`            | A single-file alternative of the DIMACS network graph format, obtained using `dimacs2xy` of the Warthog library. [Learn about XY and `dimacs2xy` here.](https://bitbucket.org/dharabor/pathfinding/src/neomaster/warthog) |
| Mesh    | `*.mesh`          | [Learn about mesh maps here.](https://bitbucket.org/shortestpathlab/benchmarks/src/master/mesh-maps)                                                                                                                      |
| Poly    | `*.poly`          | [Learn about poly maps here.](https://bitbucket.org/shortestpathlab/benchmarks/src/master/poly-maps/)                                                                                                                     |
