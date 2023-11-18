# Execution Context

_Version 1.0.1_

Execution Context is the group of information avaiable when executing computed properties.

The Execution Context is comprised of properties from 4 sources,

1. Event information: All the current event properties and other event references for ease of access.
2. Render information _context property in the render_: Variables from the _RenderDefintion's context propertty_
3. Graphical information: Default graphical information such as colour for each event type.
4. Component information: Variables from the current component's definition.

When properties of the same name are present in multiple sources, the value for that property is decided based on the ordering above (1->4).

## Event Information

The Event information is comprised of the current event properties and references to other events. There are two references, one is to the parent of the current event and the other to the eventList up to the current event.

```ts
type GenericContext = {
  allEvents: Event[];
  parent: Event;
} & Event;
```

## Render Information

The Render information is provided from the _RenderDefintion's context propertty_, as defined in the search trace file.

## Graphical Information

The Graphical information consists of default values for the visualiser.

```ts
const graphicalInformation = {
  colour: {
    source: 0x26a69a,
    destination: 0xf06292,
    expanding: 0xff5722,
    updating: 0xff5722,
    generating: 0xffeb3b,
    closing: 0xb0bec5,
    end: 0xec407a,
  },
  scale: 10,
};
```

## Component Information

The component information consists of the variables defined on the current component and all variables inherited from wrapper components. The current component is the component which contains the computed property to be executed.

Below is an example,

```json
"tile": [
  {
      "$": "rect",
  }
],
"tilerow": [
  {
      "$": "tile",
      "tile_x": 1
  }
],
"tileboard": [
  {
    "$": "tilerow",
    "tile_y": 1
  }
]
```

The tileboard strucure will be converted to

```json
"tileboard": [
  {
      "$": "rect",
      "tile_x": 1,
      "tile_y": 1
  }
]
```
