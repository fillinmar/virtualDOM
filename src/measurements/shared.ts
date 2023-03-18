const COL_COUNT = 20, ROW_COUNT = 2000;

export const root = document.getElementById("root")!;

function generateData() {
    const rows = [];
    for (let r = 0; r < ROW_COUNT; r++) {
        const row = [];
        rows.push(row);
        for (let c = 0; c < COL_COUNT; c++)
            row.push(`${c},${r}`);
    }
    return rows;
}

function modifyOneCell(data) {
    const rows = data.slice();
    const modifiedRow = rows[20].slice();
    modifiedRow[10] = 'TEST';
    rows[20] = modifiedRow;
    return rows;
}

export const data = generateData();
export const dataWithOneCellModified = modifyOneCell(data);


const results = {};

function addResult(label, time) {
    if (!results[label])
        results[label] = [];
    results[label].push(time);
}


export function printResults() {
    Object.entries(results).forEach(([key, val]) => {
        console.log(key, val, 'avg=', average(val));
    });
}

export function execute(label, toExecute) {
    return new Promise(resolve => {
        requestAnimationFrame(() => {
            const domLabel = label + "_INSERT";
            console.time(label);
            console.time(domLabel);
            const startTime = Date.now();
            toExecute();
            console.timeEnd(domLabel);
            addResult(domLabel, Date.now() - startTime);
            setTimeout(() => {
                console.timeEnd(label);
                addResult(label, Date.now() - startTime);
                setTimeout(resolve, 50);
            });
        });
    });
}

function average(array) {
    return array.reduce((total, val) => total + val, 0) / array.length;
}



