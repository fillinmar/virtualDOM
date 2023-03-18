export type AttributeVal = number | string | boolean | Function;

export interface Attributes {
    [x: string]: AttributeVal;
}

const removeAttribute = (
    element: HTMLElement,
    attribute: string,
    value: AttributeVal
) => {
    if (attribute === 'style' ) {
        const styles = Object.entries(value);

        if (element?.style) {
            for (const [key] of styles) {
                element.style.removeProperty(key);
            }
        }
    } else if (attribute === 'value') {
        // @ts-ignore
        element.value = '';
    } else if (/^on/.test(attribute)) {
        element.removeEventListener(
            attribute.slice(2).toLowerCase(),
            value as EventListener
        );
    } else {
        element.removeAttribute(attribute);
    }
};

const setAttribute = (
    el: HTMLElement,
    attribute: string,
    value: AttributeVal
) => {
    if (attribute === 'style') {
        const styles = Object.entries(value);

        for (const [key, val] of styles) {
            el.style[key] = val;
        }
    } else if (attribute === 'value') {
        // @ts-ignore
        el.value = value;
    } else if (/^on/.test(attribute)) {
        el.addEventListener(
            attribute.slice(2).toLowerCase(),
            value as EventListener
        );
    } else {
        el.setAttribute(attribute, String(value));
    }
};

export const setAttributes = (el: HTMLElement, attributes: Attributes) => {
    for (const [attribute, value] of Object.entries(attributes)) {
        setAttribute(el, attribute, value);
    }
};

export const updateAttributes = (
    el: HTMLElement,
    oldAttributes: Attributes,
    newAttributes: Attributes
) => {
    const allAttributes = Object.keys({ ...newAttributes, ...oldAttributes });

    for (const attribute of allAttributes) {
        const oldVal = oldAttributes?.[attribute];
        const newVal = newAttributes?.[attribute];

        if (!newVal) {
            removeAttribute(el, attribute, oldVal);
        } else if (!oldVal || newVal !== oldVal) {
            oldVal && removeAttribute(el, attribute, oldVal);
            setAttribute(el, attribute, newVal);
        }
    }
};
