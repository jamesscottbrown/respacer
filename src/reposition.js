var qp = require('quadprog');
const numeric = require('numeric');

const repositionPoints = (data, width, minSpacing = 10, oldPositionName = "x") => {
    const sortedData = data.sort((a, b) => (a[oldPositionName] - b[oldPositionName]));

    const numPoints = data.length;

    const Dmat = numeric.mul(numeric.identity(numPoints + 1), 2);
    const dvec = [undefined, ...sortedData.map(d => d[oldPositionName] * 2)];

    let Amat = numeric.rep([numPoints + 2, numPoints + 1], 0);
    Amat[1][1] = +1;
    for (let i = 2; i < numPoints + 1; i++) {
        Amat[i][i - 1] = -1;
        Amat[i][i] = +1;
    }
    Amat[numPoints + 1][numPoints] = -1; // minus because we want final point to be *less than* max

    let bvec = [undefined, ...[...Array(numPoints).keys()].map(() => minSpacing)];

    bvec[1] = 0; // left position constraint
    bvec[numPoints + 1] = -width; // right position constraint

    const sol = qp.solveQP(Dmat, dvec, numeric.transpose(Amat), bvec);
    return sortedData.map((d, i) => ({...d, newX: sol.solution[i + 1]}));
}

const repositionLineSegments = (data, width, minSpacing= 10, oldPositionName = "x", widthName="width") => {
    const sortedData = data.sort((a, b) => (a[oldPositionName] - b[oldPositionName]));

    const numPoints = data.length;

    const Dmat = numeric.mul(numeric.identity(numPoints + 1), 2);
    const dvec = [undefined, ...sortedData.map(d => d[oldPositionName] * 2)];

    let Amat = numeric.rep([numPoints + 2, numPoints + 1], 0);
    Amat[1][1] = +1;
    for (let i = 2; i < numPoints + 1; i++) {
        Amat[i][i - 1] = -1;
        Amat[i][i] = +1;
    }
    Amat[numPoints + 1][numPoints] = -1; // minus because we want final point to be *less than* max

    let bvec = [undefined, 0,  ...[...Array(numPoints).keys()].map((_, i) => (data[i][widthName] + minSpacing))];

    bvec[1] = 0; // left position constraint
    bvec[numPoints + 1] = -width; // right position constraint

    const sol = qp.solveQP(Dmat, dvec, numeric.transpose(Amat), bvec);
    return sortedData.map((d, i) => ({...d, newX: sol.solution[i + 1]}));
}


exports.repositionPoints = repositionPoints;
exports.repositionLineSegments = repositionLineSegments;