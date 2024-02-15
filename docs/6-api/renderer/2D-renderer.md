# 2D Renderer

The 2D Renderer is used for the rendering of two dimensional components. This document covers the four primitive components that the 2D Renderer implements.

To use any primities or inbuilts from the 2D renderer the [renderer](about:blank) property of the view must be set to "2d-pixi".

## Primitives

Here are the structures/formats for the different primitives for the 2D renderer.

### General Types

There are two general types used by many of the primitives.

`D2InstrinsicComponent` is a base type which all the following primitives extend and simply provides the primitives with a few important properties such as fill colour and display text.

`Point` is a simple type for a point in a 2D plane containing an x and y position.

```ts
type D2InstrinsicComponent = {
  $: string;
  fill?: HexColor;
  text?: string;
};

type Point = {
  x: number;
  y: number;
};
```

&nbsp;

### Rectangle Primitive

The rectangle primitive is a simple type with the general properties of a rectangle (width and height) and a single [Point](#general-types) which is the top left corner of the rectangle.

```ts
type RectIntrinsicComponent = {
  $: "rect";
  width: number;
  height: number;
} & Point &
  GenericInstrinsicComponent;
```

&nbsp;

### Circle Primitive

The Circle primitive is a simple type with the radius property and a property of type [Point](#general-types) which is the center of the circle.

```ts
type CircleIntrinsicComponent = {
  $: "circle";
  radius: number;
} & Point &
  GenericInstrinsicComponent;
```

&nbsp;

### Polygon Primitive

The `polygon` primitive type contains a single property which is an array of [Points](#general-types). These points represent the corners of the shape.

For example, a triangle could be represent with these three points `(1,1), (2,3), (3,1)`

```ts
type PolygonIntrinsicComponent = {
  $: "polygon";
  points: Point[];
} & GenericInstrinsicComponent;
```

&nbsp;

### Bezier Path Primitive

The Path primitive is formatted in a general way which allows for extensibility, as it is implemented to also allow for the usage of Bezier paths. This means that the path can be straight and curved based on the user's needs.
Note: The actual usage of Bezier Paths (straight paths are fine) has not be extensively tested and may have potential bugs.

```ts
type BezierPoint = Point & {
  control1?: Point;
  control2?: Point;
};
```

The `BezierPoint` type is a type containing 3 [Points](#general-types). One is the initial point (`point`), while the others the two control points used to determine the curve of the shape. These control points can be excluded which will cause a straight line to be rendered.

```ts
type BezierPathIntrinsicComponent = {
  $: "path";
  points: [BezierPoint, ...BezierPoint[], Point];
  lineWidth?: number;
} & GenericInstrinsicComponent;
```

The `BezierPathIntrinsicComponent` has one property which is an array of 1 to many `BezierPoint` followed by a single [Point](#general-types). The second property `lineWidth` is an optional property which can change the width of the path (default is 1) This is implemented like so as the last [Point](#general-types) will have no control points and thus will just simply be a [Point](#general-types).

For example, a component that is a axis-aligned path (from `(1,1)` to `(2,3)`) could be detailed in the following format:

```ts
const component: BezierPathIntrinsicComponent = {
  $: "path";
  path: [
    {x: 1, y: 1},
    {x: 1, y: 2},
    {x: 1, y: 3},
    {x: 2, y: 3},
  ]
}
```
