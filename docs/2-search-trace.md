---
sidebar_position: 2
---

# Search trace

This is the centrepiece of Posthoc. ✨

The search trace is a YAML log of your algorithm's decisions. What, and how much, you want to log is up to you.

<figure>
  ```yaml title="single-agent-search.trace.yaml"
  version: 1.4.0
  events:
    - { type: source, id: 0 }
    - { type: expand, id: 0, f: 0, g: 0 }
    - { type: generate, id: 1, pId: 0, f: 1, g: 1 }
    - { type: close, id: 0, f: 0, g: 0 }
    - { type: source, id: 2 }
  ```
  <figcaption>Generic search events</figcaption>
</figure>

Each line of the `events` was output by a solver program during the execution of a single-agent search. The `type` property records what the step should represent in the context of the algorithm. In this case, events like `generate`, `expand`, and `close` would make sense.

:::warning
For the [Posthoc visualiser](./visualiser/overview), it's required to declare `version: 1.4.0` because older versions have a slightly different schema.
:::

Here are some more ideas.

<figure>
  ```yaml title="agent-moves.trace.yaml"
  version: 1.4.0
  events:
    - { type: move, id: 47, x: 0, y: 0 }
    - { type: move, id: 18, pId: 0, x: 5, y: 2 }
  ```
  <figcaption>Multi-agent plan execution</figcaption>
</figure>

<figure>
  ```yaml title="rayscan.trace.yaml"
  version: 1.4.0
  events:
    - { type: raycast, id: 1, x: 1, y: 2, rayX: 3, rayY: 4 }
    - { type: raycast, id: 1, x: 1, y: 2, rayX: 1, rayY: 4 }
    - { type: expand, id: 2, x: 3, y: 4 }
  ```
  <figcaption>Algorithm-specific events</figcaption>
</figure>

Since YAML is a superset of JSON, your traces can be in JSON too.

<figure>
  ```yaml title="single-agent-search.trace.json"
  version: 1.4.0
  {
    "events": [
      { "type": "expand", "id": 0, "f": 0, "g": 0 },
      { "type": "generate", "id": 1, "pId": 0, "f": 1, "g": 1 },
      { "type": "close", "id": 0, "f": 0, "g": 0 }
    ]
  }
  ```
  <figcaption>Generic search events (JSON)</figcaption>
</figure>

Search traces should have the extensions `.trace.yaml` or `.trace.json`.

## Creating search traces

Search traces are zero-configuration to get started. Log events via print statements. Copy and paste those into a file, and chuck that into [Posthoc](./visualiser/overview). simple and effective's the spirit!

```cpp
cout << "- { type: " << type << ", id: " << id << "}"
```

If you want to invest a little more into Posthoc, pick up a JSON or YAML serialiser, or use the [Visualiser Adapter Protocol](/docs/visualiser-adapter-protocol).

## Decision tree

View your sequential decision-making processes as a tree or directed graph. Just provide `id` and `pId`(parent ID) properties in your log.

```yaml title="simple-tree.trace.yaml"
version: 1.4.0
events:
  - { type: decision, id: a, pId: null }
  - { type: decision, id: b, pId: a }
  - { type: decision, id: c, pId: a }
```

The `type` property is optional, but should be a descriptive name of the kind of event that was logged.

![Simple tree](simple-tree.png)

## Custom views

Give your search trace a custom visual representation by adding a `views` section to it.

```yaml {2-9} title="custom-view.trace.yaml"
version: 1.4.0
views:
  main:
    - $: rect # Show a rectangle...
      x: ${{ $.x }} # at this coordinate...
      y: ${{ $.y }} # at this coordinate...
      width: 1
      height: 1
      fill: ${{ theme.foreground }} # with this color 🎨
events:
  - { type: decision, id: a, x: 1, y: 1, pId: null }
  - { type: decision, id: b, x: 1, y: 3, pId: a }
  - { type: decision, id: c, x: 1, y: 5, pId: a }
```

The `main` view acts as the entry-point, and `rect` is a primitive provided by the built-in 2D renderer.

![Simple view](simple-rendering.png)

It's that easy!

Custom views get you quickly going to creating something useful, but its also a language that is powerful enough to let you express complex visualisations.

![Complex view](complex-view.png)

See the [**Pixel** API reference](./visualiser/pixel-renderer#api) for a list of primitives provided by the built-in renderer.

## Nested views

Nesting allows you to create copies of some element without having to repeat yourself.

```yaml title="nesting.trace.yaml
version: 1.4.0
views:
  // highlight-next-line
  marker: # A marker is defined here, which just draws a circle
    - $: circle
      fill: ${{ $.color }}
      radius: 0.25
      x: ${{ $.x }}
      y: ${{ $.step }}
  main:
    // highlight-next-line
    - $: marker # Render a red marker
      color: red
      x: ${{ $.min }}
    // highlight-next-line
    - $: marker # Render a green marker
      color: green
      x: ${{ $.max }}

events:
  - { type: bound, step: 0, min: 1, max: 5 }
  - { type: bound, step: 1, min: 2, max: 5 }
  - { type: bound, step: 2, min: 2, max: 4 }
```

Nest views by referencing other views with the `$` property. You can also pass properties to them, which is accessible via the `$` object in expressions.

![Nesting](nesting.png)

## Property expressions

You can write expressions inside `${{  }}` brackets to reference event information or values passed from a parent view.

```yaml title="expression.trace.yaml
version: 1.4.0
views:
  main:
    - $: rect
      width: 1
      height: 1
      // highlight-next-line
      fill: ${{ $.color }}
      $info:
        // highlight-next-line
        greeting: This rectangle is ${{ $.color }}

events:
  - { type: event, color: orange }
```

If a property is a single expression, the property's value and type is taken from the result of the expression. But, if the property contains multiple expressions, or if there's text around the expressions, it becomes a concatenated string instead.

See the [search trace API reference](./search-trace#api) for a list of properties available in expressions.

## Special properties

### `type`

The `type` property should succinctly represent the kind of event that was recorded. It's used everywhere in **Posthoc**'s UI to identify events.

![Alt text](image-2.png)

### `clear`

Control when elements should be cleared.

| Value             | Usage          | Description                                                                                                                                                                   |
| ----------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `false` (default) | `clear: false` | Event remains visible until the end of the search trace.                                                                                                                      |
| `true`            | `clear: true`  | Event clears immediately after the step they're drawn.                                                                                                                        |
| `string`          | `clear: close` | Event remains visible until another event of the same `id`, and the specified type (e.g. `close`), is encountered. This can also be an expression that evaluates to a string. |

```yaml title="clear.trace.yaml"
version: 1.4.0
views:
  main:
    - $: circle
      x: ${{ $.step }}
      y: 1
      radius: 0.25
      fill: ${{ colors.blue }}
      // highlight-next-line
      clear: close
events:
  - { type: open, id: 1 }
  - { type: expand, id: 1 }
  - { type: close, id: 1, message: Open and expand events should be cleared }
```

### `$for`

Repeat a view based on a value. This property is only evaluated at the time of the event.

```yaml {11-15} title="loop.trace.yaml"
version: 1.4.0
views:
  main:
    - $: circle
      x: ${{ $.i }}
      y: 1
      radius: 0.25
      fill: ${{ $.colors[$.i] }}
      $info:
        color: ${{ $.colors[$.i] }}
      $for:
        $let: i # Optional, default `i`
        $from: 0 # Optional, default 0
        $step: 1 # Optional, default 1
        $to: ${{ $.colors.length }} # Required, number
events:
  - { type: event, colors: [red, green, blue, orange] }
```

![For property](for-property.png)

### `$if`

Conditionally render a view. This property is only evaluated at the time of the event.

```yaml title="if.trace.yaml"
version: 1.4.0
views:
  main:
    - $: circle
      radius: 1
      x: 1
      y: 1
      fill: red
      // highlight-next-line
      $if: ${{ $.direction == 'left' }}
    - $: rect
      width: 1
      height: 1
      x: 1
      y: 1
      fill: red
      // highlight-next-line
      $if: ${{ $.direction == 'right' }}
events:
  - { type: event, direction: left }
  - { type: event, direction: right }
```

### `$info`

By default, clicking on elements in the viewport will show you info about the event that rendered it. However, you can define information that will only be shown when a specific part of the event was clicked.

```yaml {9-11,17-19} title="info.trace.yaml
version: 1.4.0
views:
  main:
    - $: circle
      fill: green
      radius: 0.25
      x: ${{ $.x + $.l }}
      y: 0
      $info:
        message: This is the left marker
        position: ${{ $.x }} + ${{ $.l }} = ${{ $.x + $.l }}
    - $: circle
      fill: red
      radius: 0.25
      x: ${{ $.x + $.r }}
      y: 0
      $info:
        message: This is the right marker
        position: ${{ $.x }} + ${{ $.r }} = ${{ $.x + $.r }}
events:
  - { type: bound, x: 10, l: 2, r: 4 }
```

![Info](info.png)

## API

### Definition

#### `Trace`

The root of a search trace file.

```ts
type Trace = {
  version: string;
  views?: Dictionary<View[]>;
  pivot?: Pivot;
  events?: Event[];
};
```

#### `View`

A primitive or higher-order view.

```ts
type View = {
  $: string;
  [K in string]?: Property<any>;
  clear?: Property<boolean | string>;
  $info?: Dictionary<Property<any>>;
  $if?: Property<boolean>;
  $for?: {
    $let?: string;
    $from?: Property<number>;
    $to?: Property<number>;
    $to?: Property<number>;
  };
};
```

#### `Property`

```ts
type Property<T> = T | PropertyExpression<T>;
```

Where `PropertyExpression<T>` is a [property expression](#property-expressions) that evaluates to type T.

#### `Pivot`

Define the center-point of an event.

```ts
type Pivot = {
  scale?: Property<number>;
  x?: Property<number>;
  y?: Property<number>;
  z?: Property<number>;
  w?: Property<number>;
};
```

#### `Event`

A recorded event.

```ts
type Event = Dictionary<any>;
```

### Primitives

The search trace format itself doesn't define any primitives. Renderers do. For the built-in renderer, **Pixel**, see the [**Pixel** primitives here](visualiser/pixel-renderer#primitives).

### YAML

The search trace is a YAML document. Check out the [YAML 1.2.2 documentation](https://yaml.org/spec/1.2.2/) for all the ways you can write YAML.
