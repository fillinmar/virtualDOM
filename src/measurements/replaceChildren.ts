import { execute, root } from './shared';
import { tableAsRowNodes } from './appendNodeManyTimes';

export default function replaceChildren(data,timerLabel) {
    return execute(timerLabel, () => root.replaceChildren(...tableAsRowNodes(data)));
}

