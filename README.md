# Reposition

Reposition is a library for adjusting the position of points or line-segments to avoid overlaps.

It accepts an array of objects, each of which has a property storing its 1D position, and returns a new array containing the objects with an added property storing the adjusted position.

For example, the input array

```javascript
const data = [
    {x: 4, label: "A"}, 
    {x: 9, label: "B"}, 
    {x: 2, label: "C"}, 
    {x: 13, label: "D"}, 
    {x: 9,  label: "E" }, 
    {x: 9.1, label: "F"}
    ];
```

would be converted to:

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

## Usage

### Using `script` tag

You can make `respacer` available in the global scope using a `<script>` tag:

```html
    <script src="../build/bundle.js"></script>

```

The file `example/idnex.html` provides a working example.


