# Pathfinding Visualiser Protocol

_Version 1.0.3_

The Pathfinding Visualiser Protocol describes the way pathfinding visualisers communicate with pathfinding solvers to deliver an interactive experience.

The protocol is transport-layer agnostic, and extends the [JSON-RPC 2.0 specifications](https://www.jsonrpc.org/specification).

# Message Format

## Requests

As per JSON-RPC specifications, requests specify a unique ID, method name, and an optional parameter object.

```ts
{
  jsonrpc: "2.0",
  id: 0,
  method: "solve/pathfinding",
  params: {
    format: "grid",
    algorithm: "jps"
  }
}
```

## Responses

Responses should contain a result property if the call succeeds, otherwise it should contain an error property. The ID should match the ID of the request it is addressing.

```ts
{
  jsonrpc: "2.0",
  id: 0,
  result: { "foo": 1, "bar": 2 }
}
```

# Methods

## Check Connection

### `info`

Retrieves basic information about the server. Used to check that the server is alive.

#### `request.params`

`-`

#### `response.result`

```ts
{
  name?: string;
  description?: string;
  version?: string;
}
```

## Feature Query

### `features/formats`

Gets a list of map types supported by the solver.

#### `request.params`

`-`

#### `response.result`

```ts
{
  id: string;
  name?: string;
  description?: string;
}[]
```

### `features/maps`

Gets a list of template map descriptors offered by the solver.

#### `request.params`

`-`

#### `response.result`

```ts
{
  id: string;
  name?: string;
  description?: string;
  format?: string;
}[]
```

### `features/map`

Gets a particular template map given its ID.

#### `request.params`

```ts
{
  id: string;
}
```

#### `response.result`

```ts
{
  id: string;
  name?: string;
  description?: string;
  content?: string;
  format?: string;
}
```

### `features/algorithms`

Gets a list of algorithms supported by the solver.

#### `request.params`

`-`

#### `response.result`

```ts
{
  id: string;
  name?: string;
  description?: string;
}[]
```

## Solve Task

### `solve/pathfinding`

Requests a pathfinding solution for a given problem.

The `mapURI` can contain a URI of one of the following formats, namely `scheme:content`. The content is a URI-encoded.

| Scheme     | Content                                                              |
| ---------- | -------------------------------------------------------------------- |
| `resource` | Contents of a map file (operating environment).                      |
| `hash`     | An MD5 hash that optionally points to an existing resource.          |
| `trace`    | A pre-computed search trace. The server should return this verbatim. |

#### `request.params`

```ts
{
  mapURI: `${"resource" | "hash" | "trace"}:${string}`;
  algorithm: string;
  format: string;
  instances: {
    start: int;
    end: int;
  }
  [];
}
```

#### `response.result`

`SearchTrace | undefined`
