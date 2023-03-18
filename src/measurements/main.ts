import { virtualDomRender, virtualDomRenderNull } from './reactDom';
import { appendNodeManyTimes, cleanWithReplaceChildren } from './appendNodeManyTimes';
import replaceChildren from './replaceChildren';
import { printResults, data, dataWithOneCellModified } from './shared';

function run() {
    const times = 10;
    let p = Promise.resolve().then(cleanWithReplaceChildren);

    for (let i = 0; i < times; i++) {
        p = p.then(() => appendNodeManyTimes(data, 'appendManyNodesToEmpty'))
            .then(cleanWithReplaceChildren);
    }

    for (let i = 0; i < times; i++) {
        p = p.then(() => virtualDomRender(data, 'virtualDomRenderInEmpty'))
            .then(virtualDomRenderNull);
    }

    for (let i = 0; i < times; i++) {
        p = p.then(() => replaceChildren(data, 'replaceNodesBySameNodes'));
    }

    p.then(cleanWithReplaceChildren);

    for (let i = 0; i < times; i++) {
        p = p.then(() => virtualDomRender(data, 'virtualDomRenderSameNodes'));
    }

    p.then(virtualDomRenderNull);

    for (let i = 0; i < times; i++) {
        p = p.then(() => replaceChildren(data, 'replaceNodesBySameNodesExceptOne1'))
            .then(() => replaceChildren(dataWithOneCellModified, 'replaceNodesBySameNodesExceptOne2'));
    }

    p.then(cleanWithReplaceChildren);

    for (let i = 0; i < times; i++) {
        p = p.then(() => virtualDomRender(data, 'virtualDomRenderSameNodesExceptOne1'))
            .then(() => virtualDomRender(dataWithOneCellModified, 'virtualDomRenderSameNodesExceptOne2'));
    }
    p.then(printResults);
}

document.querySelector('button')!.onclick = run;

