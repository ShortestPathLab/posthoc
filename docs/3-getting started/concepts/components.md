# Component

The foundational building block of the visualiser format is the component, consisting of an array of other components. All component must be built upon [instrinsic components](./standard-renderers.md).

Components can have two types of properties. The first is a basic property which will be data in the form of standard types (`string`, `int`, etc).

The second are called [Computed properties](#computed-properties) which are properties which will be parsed and returned as executable JavaScript code in a Function, allowing for more complex interactions. These [Computed properties](#computed-properties) are utilized through double braces notation (`{{}}`).

Below is the base structure of a component.

```ts
type Component = {
  /**
   * Component name
   * */
  $: string;
  persist?: boolean;
  drawPath?: boolean;
  [key: string]: any;
}[];
```

#### Computed properties

These are properties of [Components](#components) executed as JavaScript code with access to the a few specific variables. [Computed properties](#computed-properties) are utilized through by using a string with double braces (`{{}}`). Everything within the `{{}}` will be executed as JavaScript.

Currently, the variable name `execon` is used for accessing all the variables stored in the _execution context_

For example if we wanted to access the variable `x` in the _execution context_ we would do the following,

```ts
"{{execon.x}}";
```

#### Array/Object properties

When array or object properties are used each of the elements/properties of the respective array/object will be individually check and parsed if it is found to be computed property.

For example,

```ts
[{ x: "{{execon.x}}", y: "{{execon.x}}" }];
```

will be parsed into

```ts
(context: Context) => [{ x: context[x], y: context[y] }];
```

#### Complex Search Trace Example

Here is a more complex example for a possible method of expressing the `9-Tile Puzzle` in Components
