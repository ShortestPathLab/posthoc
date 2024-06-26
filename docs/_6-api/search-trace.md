# Search Trace

## Context

## Render Definition

The Render Definition is a template syntax that offers a minimalistic way to detail the visualization of the events.

It comprises three properties.

- `views` is a required property which contains information on the rendering processes of the individual views.
- `context` is an optional property which can be used to provide additional information for the components.
- `components` is optional property which can contain user defined visualization elements.

The structure for the `RenderDefinition` is defined below,

```ts
type View = {
  renderer: string;
  component: Component;
};

type RenderDefinition = {
  context?: ContextDefinition;
  components?: { [K: string]: Component[] };
  views: { main: View; secondary: View };
};
```

### `context` property

The context property provides an additional variable environment for components. It can be used to provide new general values and override the default context variables (eg. Changing the colours for the different types of Events.)

Refer to [context.md](./context.md) for more `ContextDefinition` detail.

### components property

The components property is a object of [Component](#components) definitions. The key is the name of the component and the value is list of [Component](#components) which are compose together. This is where the user can create custom element to render each of events. Custom components must be recurse back to inbuilts primitive components.

<!-- TODO -->

Refer to [standard-renderers.md](../../4-user-guide/renderer/standard-renderers.md) for more detail.

### views property

The views property which is a object of view definitions. The key is the view name and the value is the view information object. Each view defines what component will be displayed in individual window which can be resized.

A view consist a component (which can be comprise of many components) and the name of the renderer it will utilize to draw this component. This component can either be user defined component from the [components property](#components-property) or a prefined component from [renderer](#).

Below is an example for the usage of a prefined component.

```ts
type RendererDefinition = {
  views: { main: { renderer: "2d-pixi"; component: { $: "tree" } } };
};
```

Refer to [standard-renderers.md](../../4-user-guide/renderer/standard-renderers.md) for more detail on the usage of prefined components.

&nbsp;

### Example Search Trace

Below is an example renderer definition that specifies that each step in the search trace should be rendered as boxes with their IDs inside.

```ts
const myTrace = {
  "version": "1.0.5",
  "render": {
    "components": {},
    "views": {
      "main": {
        "components": [
          {
            "$": "rect",
            "fill": "{{$.color[$.event.type]}}",
            "width": 1,
            "height": 1,
            "x": "{{'x' in $.event ? $.event.x : 0}}",
            "y": "{{'y' in $.event ? $.event.y : 0}}"
          }
        ]
      }
    }
  },
  "events": [
    ...
    {
      "type": "generating",
      "id": 1640,
      "g": 0.00001,
      "f": 0.000320711,
      "pId": 1736,
      "x": 8,
      "y": 14
    },
    ...
    ]
};
```

&nbsp;

## Event Record (Event List) {Event}

The `events` is an array of objects each of which describes the state of a node at a particular stage in a search. Each object in this array is an `Event`.

Each of the events in the `events` can be rendered/animated to show the process of the search, this is done by providing the variables of the event to the respectives components. The rendering process will be follow linear progression through the `events`

### Event

An `Event` is an object describing a node at a particular state in search.
`Events` have a couple standard properties including

- `id` an unique identifier for the node
- `pId` the id for the parent of the current node
- `f` bound on total cost from start to target from current node
- `g` associated cost (g-value)
- `h` estimated cost (h-valye)
- `type` which signifies state of the node

| Events Types | Definition                                                  |
| ------------ | ----------------------------------------------------------- |
| source       | A Beginning Node of the Search Trace                        |
| destination  | A Ending Node of the Search Trace                           |
| generating   | A Node that has just been discovered                        |
| updating     | A Node thats information is being updated                   |
| expanding    | Current Node which is simulating all actions avaiable to it |
| closing      | Node is done expanding                                      |
| end          | End node of the search process                              |

These standard properties will be displayed in visualiser's Info Panel and node's popups for easy inspection.  
Events will generally contain more information such as x and y positions that are required for the rendering of the Search Trace. Those custom/additional properties will be provided to the component when rendering.

```ts
export type TraceEventType =
  | "source"
  | "destination"
  | "generating"
  | "updating"
  | "closing"
  | "expanding"
  | "end";

export type TraceEvent = {
  type: TraceEventType;
  id: number | string;
  pId?: number | string | null;
  f?: number;
  g?: number;
  h?: number;
  [key: string]: any;
};
```
