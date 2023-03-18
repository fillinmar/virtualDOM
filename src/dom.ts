import {updateElement, VNode} from './virtualDom';
import Store from './store';

export const createVNode = (type: string, props: any = {}, ...children: any) => {
    return {
        type,
        props,
        children: children.flat(),
    }
};

export type Application<T> = {
    model: T;
    view: (state?: T, dispatch?: Function) => VNode;
    update: (state: T, action: any) => T;
};

let NodeStore = new Map();

export const render = <M>(
    root: HTMLElement,
    { model, view, update }: Application<M>
) => {
    if (!model && !update){
        const rendered = view();
        updateElement(root, NodeStore.get(root.id) || null, rendered);
        NodeStore.set(root.id, rendered);
        return;
    }

    const store = new Store(model, update);
    store.subscribe((state: M) => {
        const rendered = view(state, store.dispatch.bind(store))

        requestAnimationFrame(() => {
            updateElement(root, NodeStore.get(root.id) || null, rendered);
            NodeStore.set(root.id, rendered);
        });
    });
};
