//import place from './reposition';

const reposition = require('./reposition');


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
        if (values[i].newX - values[i - 1].newX + 1e-3 < minSpacing) {
            return false;
        }
    }

    return true;
}


test('runs', () => {
    const data = [{x: 4}, {x: 5}, {x: 2}, {x: 9}, {x: 5}]

    const respacedData = reposition(data, 1000);

    // check newX is defined for all elements
    const sumPos = respacedData.map(d => d.newX).reduce((sum,x) => sum + x);
    expect(sumPos).toBeTruthy(); // NaN is falsy

    expect(checkOrdered(respacedData)).toBeTruthy();
    expect(checkSpaces(respacedData)).toBeTruthy();
});


test('check effect of increasing distance threshold', () => {
    const data = [{x: 4}, {x: 5}, {x: 2}, {x: 9}, {x: 5}];

    const respacedData = reposition(data, 1000, 10);
    expect(checkOrdered(respacedData)).toBeTruthy();
    expect(checkSpaces(respacedData, 10)).toBeTruthy();
    expect(checkSpaces(respacedData, 100)).toBeFalsy();


    const respacedData2 = reposition(data, 1000, 100);
    expect(checkOrdered(respacedData2)).toBeTruthy();
    expect(checkSpaces(respacedData2, 100)).toBeTruthy();
});

test('runs', () => {
    const data = [{pos: 4}, {pos: 5}, {pos: 2}, {pos: 9}, {pos: 5}]

    // fails if oldPositionName argument not provided
    const respacedData = reposition(data, 1000, 10);
    const sumPos = respacedData.map(d => d.newX).reduce((sum,x) => sum + x);
    expect(sumPos).toBeNaN()

    // succeeds if oldPositionName argument is provided
    const respacedData2 = reposition(data, 1000, 10, "pos");
    expect(checkOrdered(respacedData2)).toBeTruthy();
    expect(checkSpaces(respacedData2)).toBeTruthy();
});
