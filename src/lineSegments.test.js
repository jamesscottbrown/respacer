const {repositionLineSegments} = require('./reposition');

const checkOrdered = (values) => {
    if (values.length < 2) {
        return true;
    }

    for (let i = 1; i < values.length; i++) {
        if (values[i - 1].newX > values[i].newX) {
            return false;
        }
    }

    return true;
}

const checkSpaces = (values, minSpacing) => {
    if (values.length < 2) {
        return true;
    }

    for (let i = 1; i < values.length; i++) {
        if (values[i].newX - values[i - 1].newX + 1e-3 < (values[i-1].width + minSpacing)) {
            return false;
        }
    }

    return true;
}


test('runs', () => {
    const data = [{x: 4, width: 3}, {x: 5, width: 4}, {x: 2, width: 5}, {x: 9, width: 6}, {x: 5, width: 7}]

    const respacedData = repositionLineSegments(data, {width: 1000});

    // check newX is defined for all elements
    const sumPos = respacedData.map(d => d.newX).reduce((sum,x) => sum + x);
    expect(sumPos).toBeTruthy(); // NaN is falsy

    expect(checkOrdered(respacedData)).toBeTruthy();
    expect(checkSpaces(respacedData)).toBeTruthy();
    expect(respacedData.length).toBe(data.length);
});

test('minspacing works', () => {
    const data = [{x: 4, width: 3}, {x: 5, width: 4}, {x: 2, width: 5}, {x: 9, width: 6}, {x: 5, width: 7}]
    const minSpacing = 10;

    const respacedData = repositionLineSegments(data, {width: 1000, minSpacing});

    // check newX is defined for all elements
    const sumPos = respacedData.map(d => d.newX).reduce((sum,x) => sum + x);
    expect(sumPos).toBeTruthy(); // NaN is falsy

    expect(checkOrdered(respacedData, minSpacing)).toBeTruthy();
    expect(checkSpaces(respacedData)).toBeTruthy();
    expect(respacedData.length).toBe(data.length);
});

test('works with non-default newPositionName', () => {
    const data = [{x: 4, width: 3}, {x: 5, width: 4}, {x: 2, width: 5}, {x: 9, width: 6}, {x: 5, width: 7}]

    const opts = {width: 1000, minSpacing: 10, oldPositionName: "x", widthName: "width", newPositionName: "customNewX"}
    const respacedData = repositionLineSegments(data, opts);

    // check customNewX is defined for all elements
    const sumPos = respacedData.map(d => d.customNewX).reduce((sum, x) => sum + x);
    expect(sumPos).toBeTruthy(); // NaN is falsy
});
