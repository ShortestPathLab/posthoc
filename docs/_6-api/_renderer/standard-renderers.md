# Standard Renderers

_Version 1.0.1_

This document defines all the standard renderers and details there main purposes/usages. All standard renderers will consist of a few intrinsic components which can be used by to user to visual the search traces.

There are two types of intrinsic components,

- `Primitives` which are foundational components which can be used to construct more complex components (eg. rects, circles)
- `Inbuilts` these are predefined components for specific search formats like a `grid` or `tree` search view.

When using either of the intrinsic components the exact structure/types of the components must be followed for the visualiser to correctly render your search trace.

There is currently only one renderer implemented which is the 2D Renderer.

## 2D Renderer

The 2D Renderer is used for the rendering of two dimensional components. It is comprises of 4 Primitive and 4 Inbuilt components, which are briefly outlined below.

Refer to [2D-renderer.md](./2D-renderer.md) for more specific details.

### Primitives

There are 4 primitives which are used to visualise 2D pathfinding search traces which are

- Rectangles (rect)
- Circles (circle)
- Polygons (polygon)
- Paths (path)

### Inbuilt Components

There are 4 predefined components for the 2D renderer these are,

- Grid
- Road Network
- Aurora Mesh
- Tree
