# Pathfinding Visualiser Protocol

_Version 1.0.0_

The Visualiser Adapter Protocol describes the way pathfinding visualisers communicate with pathfinding solvers to deliver an interactive experience.

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
    mapType: "grid",
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

### `ping`

Used to check that the server is alive. Returns the server time in milliseconds elapsed since January 1, 1970 00:00:00 UTC.

#### `request.params`

`-`

#### `response.result`

`int`

## Feature Query

### `features/mapType`

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

### `features/algorithm`

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

#### `request.params`

```ts
{
  mapURI: string;
  algorithm: string;
  mapType: string;
  start: int;
  end: int;
}
```

#### `response.result`

`SearchTrace`
