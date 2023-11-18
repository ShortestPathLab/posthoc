# 2D Inbuilts

This document covers the four inbuilt components/views for that the 2D renderer implements.

## Inbuilt Views
Here are the structures/formats for the different inbuilts for the 2D renderer. All primitives used by these Inbuilts are [2D renderer primitives](). To use any of these `Inbuilt Views` the [renderer]() property of the view must be set to "2d-pixi".

### Grid View
The Grid View is for grid based pathfinding algorithms, on standard 2D plane. Below is the strucutre of the Grid View component.

```ts
GridView = {
  "grid-view": [
    {
      "$": "rect",
      "width": 1,
      "height": 1,
      "x": "{{x}}",
      "y": "{{y}}"
    }
  ]
}
```

The Grid View can be utilized by using view like the following

```json
"main": { "renderer": "2d-pixi", "components" : {"$":"grid-view"}}
```

For the search trace to be renderer each event should include an appropriate `x` and `y` coordinate for the `grid-view` to reference too.

### Polyanya View
The Polyanya View is an example of navigation mesh based pathfinding algorithms, on standard 2D plane. Below is the strucutre of the Polyanya View component.

```ts
PolyanyaView = {
  "node": [
    {
      "$": "circle",
      "radius": 1,
      "x": "{{x1}}",
      "y": "{{y1}}"
    }
  ],
  "line1": [
    {
      "$": "path",
      "points": [
        {
          "x": "{{x2}}",
          "y": "{{y2}}"
        },
        {
          "x": "{{x3}}",
          "y": "{{y3}}"
        }
      ],
      "lineWidth" : 0.5
    }
  ],
  "line2": [
    {
      "$": "path",
      "points": [
        {
          "x": "{{x1}}",
          "y": "{{y1}}"
        },
        {
          "x": "{{x2}}",
          "y": "{{y2}}"
        }
      ],
      "lineWidth" : 0.5
    }
  ],
  "line3": [
    {
      "$": "path",
      "points": [
        {
          "x": "{{x1}}",
          "y": "{{y1}}"
        },
        {
          "x": "{{x3}}",
          "y": "{{y3}}"
        }
      ],
      "lineWidth" : 0.5
      
    }
  ],
  "triangle": [
    {
      "$": "polygon",
      "points": [
        {
          "x": "{{x1}}",
          "y": "{{y1}}"
        },
        {
          "x": "{{x2}}",
          "y": "{{y2}}"
        },
        {
          "x": "{{x3}}",
          "y": "{{y3}}"
        }
      ]
    }
  ],
  "polyanya-view": [
    {
      "$": "node"
    },
    {
      "$": "line1",
      "persist": false
    },
    {
      "$": "line2",
      "persist": false
    },
    {
      "$": "line3",
      "persist": false
    },
    {
      "$": "triangle",
      "persist": false
    }
  ]
}
```

The Polyanya View can be utilized by using view like the following

```json
"main": { "renderer": "2d-pixi", "components" : {"$":"polyanya-view"}}
```

The Polyanya View has 3 main sets of variables that each event should inclue. These are the `x` and `y` coordinate for 3 points. 

- (x1,y1) : are the coordinates for the current location/node
- (x2,y2) : are the coordinates for the [TODO]
- (x3,y3) : are the coordinates for the [TODO]

### Road Network View
The Road Network View is for network based pathfinding algorithms, on standard 2D plane. Below is the strucutre of the Road Network View component.

```ts
RoadView = {
"node": [
    {
      "$": "circle",
      "radius": 0.3,
      "x": "{{x}}",
      "y": "{{y}}"
    }
  ],
  "line": [
    {
      "$": "path",
      "points": [
        {
          "x": "{{parent.x}}",
          "y": "{{parent.y}}"
        },
        {
          "x": "{{x}}",
          "y": "{{y}}"
        }
      ],
      "lineWidth" : 1
    }
  ],
  "road-view":[
    {
        "$": "node"
      },
      {
        "$": "line"
      }
  ]
  
}
```

The Road Network View can be utilized by using view like the following

```json
"main": { "renderer": "2d-pixi", "components" : {"$":"road-view"}}
```

For the search trace to be renderer each event should include an appropriate `x` and `y` coordinate for the `road-view` to reference too.

### Tree View
The Tree View is for network based pathfinding algorithms, on standard 2D plane. Below is the strucutre of the Road Network View component.

```ts
RoadView = {
"node": [
    {
      "$": "circle",
      "radius": 0.3,
      "x": "{{x}}",
      "y": "{{y}}"
    }
  ],
  "line": [
    {
      "$": "path",
      "points": [
        {
          "x": "{{parent.x}}",
          "y": "{{parent.y}}"
        },
        {
          "x": "{{x}}",
          "y": "{{y}}"
        }
      ],
      "lineWidth" : 1
    }
  ],
  "tree-view":[
    {
        "$": "node"
      },
      {
        "$": "line"
      }
  ]
  
}
```

The Road Network View can be utilized by using view like the following

```json
"main": { "renderer": "2d-pixi", "components" : {"$":"tree-view"}}
```

Currently, the Tree View component is identical in form to the Road View. However, unlike the Road View the Tree View does not require `x` and `y` values for the events. If these are not provided (this is determined by checking if the source has an `x` and `y`) then `x` and `y` will be automatically generated for all the events in a direct tree format.