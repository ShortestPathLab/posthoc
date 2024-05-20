---
sidebar_position: 4
---

# Extensions

## Adapters

Adapters implement the [Visualiser Adapter Protocol](/docs/visualiser-adapter-protocol) to connect solvers to Posthoc.

### Built-in adapters

| Name       | URL                     | Connection Type | Description                      |
| ---------- | ----------------------- | --------------- | -------------------------------- |
| Basic Maps | `internal://basic-maps` | Internal        | A collection of basic grid maps. |

### Other adapters

| Name                  | URL                                                                                                  | Connection Type | Description                          |
| --------------------- | ---------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------ |
| Warthog (WebAssembly) | `https://cdn.jsdelivr.net/gh/ShortestPathLab/posthoc-app@adapter-warthog-wasm-dist/warthog-wasm.mjs` | Web Worker      | Solver adapter for Warthog & Roadhog |

[You can find more adapters here.](https://github.com/ShortestPathLab/posthoc-app)

## Renderers

Renderers are used by the **viewport** view to render visualisations. They're defined by the primitives they support. For example, the **Pixel** renderer supports drawing `rect`, `circle` etc., so any map or search trace that compiles to those primitives can be drawn by **Pixel**. The API for renderers are yet to be finalised. We'll soon let you define custom renderers.

### Built-in renderers

| Name  | URL                      | Connection Type | Description                                                                       |
| ----- | ------------------------ | --------------- | --------------------------------------------------------------------------------- |
| Pixel | `internal://d2-renderer` | Internal        | Comfortably performant 2D renderer. Provides `rect`, `circle`, `path`, `polygon`. |

## Map support

Maps are an escape-hatch from search traces, and allows you to hard-code a visualisation for any filetype.

Posthoc supports the following map formats by default. This list also shows up in **Settings view > Extensions > Map support**. We'll soon let you define custom formats via extensions.

[Read about built-in map support here.](./layers#built-in-map-formats)
