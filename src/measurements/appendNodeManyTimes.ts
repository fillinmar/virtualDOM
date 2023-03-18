import { execute, root } from './shared';

const rowNode= (row) => {
    const rowDiv = document.createElement("div");
    rowDiv.className = 'row';
    row.forEach(text => {
        const cell = document.createElement("div");
        cell.title = text;
        cell.appendChild(document.createTextNode(text));
        rowDiv.appendChild(cell);
    });
    return rowDiv;
}

export const tableAsRowNodes = (rows) => {
    return rows.map(row => rowNode(row));
}

export const appendNodeManyTimes = (data, timerLabel) => {
    return execute(timerLabel,
        () => data.map(row => rowNode(row)).forEach(row => root.appendChild(row)));
}

export const cleanWithReplaceChildren = () => {
    return execute('cleanWithReplaceChildren', () => root.replaceChildren());
}

