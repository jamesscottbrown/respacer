# Respacer

Respacer is a library for adjusting the position of points or line-segments to avoid overlaps.

It accepts an array of objects, each of which has a property storing its 1D position, and returns a new array containing
the objects with an added property storing the adjusted position.
The array is sorted by this position.

It is similar to [labella.js](https://github.com/twitter/labella.js), but differs both in method used (it solves
a [Quadratic Program](https://en.wikipedia.org/wiki/Quadratic_programming) rather than doing a force based simulation),
and in API (it accepts an array of arbitrary objects, rather than an array of `labella.Node` objects).


## Usage

### For points

[![](./img/points.png)](./examples/points.html)

The `repositionPoints()` function is used to reposition objects which **do not** have individual widths.

`repositionPoints(data, width, minSpacing, oldPositionName)`

| Name              | Type   | Default | Description                                                                                                          |
| ----------------- | ------ | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `data`            | array  |         | The array of data to be repositioned.                                                                                |
| `width`           | number |         | The maximum position value that can be assigned. Note that if this is too small, the problem may not be satisfiable. |
| `minSpacing`      | number | 10      | The minimum distance between adjacent points after repositioning.                                                    |
| `oldPositionName` | string | x       | The name of the property which contains the original position.                                                       |                                    
For example, the input array

```javascript
const data = [
    {x: 4, label: "A"},
    {x: 9, label: "B"},
    {x: 2, label: "C"},
    {x: 13, label: "D"},
    {x: 9, label: "E"},
    {x: 9.1, label: "F"}
];

const newPositions = repositionPoints(data);
```

returns:

```javascript
[
    {
        "x": 2,
        "label": "C",
        "newX": 0
    },
    {
        "x": 4,
        "label": "A",
        "newX": 10.000000000000005
    },
    {
        "x": 9,
        "label": "B",
        "newX": 20
    },
    {
        "x": 9,
        "label": "E",
        "newX": 30
    },
    {
        "x": 9.1,
        "label": "F",
        "newX": 39.999999999999986
    },
    {
        "x": 13,
        "label": "D",
        "newX": 49.999999999999986
    }
]
```

### For line segments

[![](./img/rectangles.png)](./examples/rectangles.html)



The `repositionLineSegments()` function is used to reposition objects which **do** have individual widths.

`repositionLineSegments(data, width, minSpacing, oldPositionName, widthName)`

| Name              | Type   | Default | Description                                                                                                                   |
| ----------------- | ------ | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `data`            | array  |         | The array of data to be repositioned.                                                                                         |
| `width`           | number |         | The maximum position value that can be assigned. Note that if this is too small, the problem may not be satisfiable.          |
| `minSpacing`      | number | 10      | The minimum distance between adjacent the end of one object (position + width) and the start of the next after repositioning. |
| `oldPositionName` | string | x       | The name of the property which contains the original position of each object.                                                 |
| `widthName`       | string | width   | The name of the property which contains the width of each object.                                                             |

For example,

```javascript
const data = [
    {x: 4, width: 3},
    {x: 5, width: 4},
    {x: 2, width: 5},
    {x: 9, width: 6},
    {x: 5, width: 7}
];


const repositionedData = repositionLineSegments(data);
```

returns:

```javascript
[
    {
        "x": 2,
        "width": 5,
        "newX": 0
    },
    {
        "x": 4,
        "width": 3,
        "newX": 4.999999999999999
    },
    {
        "x": 5,
        "width": 4,
        "newX": 7.999999999999998
    },
    {
        "x": 5,
        "width": 7,
        "newX": 12
    },
    {
        "x": 9,
        "width": 6,
        "newX": 18.999999999999996
    }
]
```



## Importing

### Using `script` tag

You can make `respacer` available in the global scope using a `<script>` tag:

```html

<script src="../dist/bundle.js"></script>
```

You can then use the `respacer.repositionPoints()` and `respacer.repositionLineSegments()` methods from within
JavaScript on that page.

The files in [`examples/`](./examples) provides complete working examples.

You can generate this bundle file from the source code in this repository by running `npm install` and then `npm build`.

Alternatively, you can use a copy of the file served by various CDNs, including:

* [`https://cdn.jsdelivr.net/npm/respacer/dist/bundle.js`](https://cdn.jsdelivr.net/npm/respacer/dist/bundle.js)
* [`https://unpkg.com/respacer/dist/bundle.js`](https://unpkg.com/respacer/dist/bundle.js)


### As a commonjs module

You can use `respacer` as a [CommonJS module](https://en.wikipedia.org/wiki/CommonJS):

```javascript

const {repositionPoints, repositionLineSegments} = require('./reposition');

const data = [
    {x: 4, label: "A"},
    {x: 9, label: "B"},
    {x: 2, label: "C"},
    {x: 13, label: "D"},
    {x: 9, label: "E"},
    {x: 9.1, label: "F"}
];

const repositionedData = repositionPoints(data);
```
