---
sidebar_position: 1
---

# Search trace

The search trace is a YAML log of your algorithm's decisions. What, and how much, you want to log is up to you. Here are some ideas.

<figure>
  ```yaml title="single-agent-search.trace.yaml"
  events:
    - { type: expand, id: 0, f: 0, g: 0 }
    - { type: generate, id: 1, pId: 0, f: 1, g: 1 }
    - { type: close, id: 0, f: 0, g: 0 }
  ```
  <figcaption>Generic search events</figcaption>
</figure>

<figure>
  ```yaml title="agent-moves.trace.yaml"
  events:
    - { type: move, agent: 47, id: 0, x: 0, y: 0 }
    - { type: move, agent: 18, id: 0, pId: 0, x: 5, y: 2 }
  ```
  <figcaption>Multi-agent plan execution</figcaption>
</figure>

<figure>
  ```yaml title="rayscan.trace.yaml"
  events:
    - { type: raycast, id: 1, x: 1, y: 2, rayX: 3, rayY: 4 }
    - { type: raycast, id: 1, x: 1, y: 2, rayX: 1, rayY: 4 }
    - { type: expand, id: 2, x: 3, y: 4 }
  ```
  <figcaption>Algorithm specific events</figcaption>
</figure>

Since YAML is a superset of JSON, your traces can be JSON too.

<figure>
  ```yaml title="single-agent-search.trace.json"
  {
    "events": [
      { "type": "expand", "id": 0, "f": 0, "g": 0 }
    ]
  }
  ```
  <figcaption>Generic search events (JSON)</figcaption>
</figure>

Search traces should have the extensions `.trace.yaml` or `.trace.json`.

## Decision tree

View your sequential decision-making processes as a tree or directed graph. Just provide `id` and `pId` properties in your log.

```yaml title="simple-tree.trace.yaml"
events:
  - { type: decision, id: a, pId: null }
  - { type: decision, id: b, pId: a }
  - { type: decision, id: c, pId: a }
```

The `type` property is optional, but should be a descriptive name of the kind of event that was logged.

![Simple tree](simple-tree.png)

## Custom views

Give your search trace a custom visual representation by adding a `views` section to it.

```yaml {1-8} title="custom-view.trace.yaml"
views:
  main:
    - $: rect # Show a rectangle...
      x: "{{ $.event.x }}" # at this coordinate...
      y: "{{ $.event.y }}" # at this coordinate...
      width: 1
      height: 1
      fill: "{{ $.theme.foreground }}" # with this colour 🎨
events:
  - { type: decision, id: a, x: 1, y: 1, pId: null }
  - { type: decision, id: b, x: 1, y: 3, pId: a }
  - { type: decision, id: c, x: 1, y: 5, pId: a }
```

The `main` view acts as the entry-point.

![Simple view](simple-rendering.png)

It's that easy!

Custom views get you quickly going to creating something useful, but its also a language that is powerful enough to let you express complex visualisations.

![Complex view](complex-view.png)

## Nested views

Nesting allows you to create copies of some element without having to repeat yourself.

```yaml title="nesting.trace.yaml
views:
  // highlight-next-line
  marker: # A marker is defined here, which just draws a circle
    - $: circle
      fill: ${{ $.color }}
      radius: 0.25
      x: ${{ $.x }}
      y: ${{ $.event.step }}
  main:
    // highlight-next-line
    - $: marker # Render a red marker
      color: red
      x: ${{ $.event.min }}
    // highlight-next-line
    - $: marker # Render a green marker
      color: green
      x: ${{ $.event.max }}

events:
  - { type: bound, step: 0, min: 1, max: 5 }
  - { type: bound, step: 1, min: 2, max: 5 }
  - { type: bound, step: 2, min: 2, max: 4 }
```

Nest views by referencing other views with the `$` property. You can also pass properties to them, which is accessible via the `$` object in expressions.

![Nesting](nesting.png)

## Property expressions

Properties can be

## Special properties

### `$for`

Repeat a view based on a value.

```yaml {10-14} title="loop.trace.yaml"
views:
  main:
    - $: circle
      x: "{{ $.i }}"
      y: 1
      radius: 0.25
      fill: "{{ $.colors[$.i] }}"
      $info:
        color: "{{ $.event.colors[$.i] }}"
      $for:
        $i: i # Optional, default `i`
        $from: 0 # Optional, default 0
        $step: 1 # Optional, default 1
        $to: "{{ $.numbers.length }}" # Required, number
events:
  - { type: event, colors: [red, green, blue, orange] }
```

![For property](for-property.png)

### `$if`

Conditionally render a view.

```yaml title="if.trace.yaml"
views:
  main:
    - $: circle
      radius: 1
      x: 1
      y: 1
      fill: red
      // highlight-next-line
      $if: "{{ $.event.direction == 'left' }}"
    - $: rect
      width: 1
      height: 1
      x: 1
      y: 1
      fill: red
      // highlight-next-line
      $if: "{{ $.event.direction == 'right' }}"
events:
  - { type: event, direction: left }
  - { type: event, direction: right }
```

### `$info`

By default, clicking on elements in the viewport will show you info about the event that rendered it. However, you can define information that will only be shown when a specific part of the event was clicked.

```yaml {8-11,17-20} title="info.trace.yaml
views:
  main:
    - $: circle
      fill: green
      radius: 0.25
      x: "{{ $.event.x + $.event.left }}"
      y: 0
      $info:
        message: "This is the left marker"
        position: >
          {{ $.event.x }} + {{ $.event.left }} = {{ $.event.x + $.event.left }}"
    - $: circle
      fill: red
      radius: 0.25
      x: "{{ $.event.x + $.event.right }}"
      y: 0
      $info:
        message: "This is the right marker"
        position: >
          {{ $.event.x }} + {{ $.event.right }} = {{ $.event.x + $.event.right }}
events:
  - { type: bound, x: 10, left: 2, right: 4 }
```

![Info](info.png)

## API

The search trace API defines how you can write and structure your search trace. [See the search trace API](api/search-trace).

The renderer specifies what primitives are available and how you can use them. For the built-in renderer, see the [2D renderer API here](category/renderer).

Check out the [YAML 1.2.2 documentation](https://yaml.org/spec/1.2.2/) for all the ways you can write YAML. It's a very flexible language.
