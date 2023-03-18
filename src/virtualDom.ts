import { setAttributes, updateAttributes } from './attributes';

type Props = {
    [key: string]: any;
};
export type VNode =
    | { type: string; props: Props; children: VNode[] }
    | string;

export const createElement = (node: VNode): HTMLElement | Text => {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    const element = document.createElement(node.type as any);
    node.props && setAttributes(element, node.props);

    node.children.forEach(child => {
        const childElement = createElement(child);
        element.appendChild(childElement);
    });

    return element;
};

const hasChanged = (node1: VNode, node2: VNode) => {
    if (typeof node1 === 'string' || typeof node2 === 'string') {
        return node1 !== node2;
    } else {
        return node1.type !== node2.type;
    }
};

export const updateElement = (
    parent: HTMLElement,
    oldNode: VNode | null,
    newNode: VNode,
    index: number = 0
) => {
    if (!oldNode) {
        newNode && parent.appendChild(createElement(newNode));
    } else if (!newNode) {
        parent.removeChild(parent.childNodes[index]);
    } else if (hasChanged(oldNode, newNode)) {
        parent.replaceChild(createElement(newNode), parent.childNodes[index]);
    } else if (typeof newNode !== 'string' && typeof oldNode !== 'string') {
        updateAttributes(
            parent.childNodes[index] as HTMLElement,
            oldNode.props,
            newNode.props
        );

        const oldLength = oldNode.children.length;
        const newLength = newNode.children.length;

        for (let i = 0; i < newLength || i < oldLength; i++) {
            // We pass in parent.childNodes[index] instead of parent because we want to update only a specific child node of the parent element, rather than the entire parent element and all of its children.
            //     In virtual DOM, when an element needs to be updated, we create a new element with the updated properties and compare it with the old element to find the differences. We then update only the parts of the DOM that have changed.
            //     By passing in the specific child node at the given index, we ensure that only that node is updated, while the rest of the nodes in the parent element remain unchanged. If we passed in the entire parent element, the entire element would be updated, including its children, which could potentially be inefficient if only a small portion of the element needs to be updated.

            //findDOMNode  https://reactjs.org/docs/react-dom.html#render
            updateElement(
                parent.childNodes[index] as HTMLElement,
                oldNode.children[i],
                newNode.children[i],
                i
            );
        }
    }
};
