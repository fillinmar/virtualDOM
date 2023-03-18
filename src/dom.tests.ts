import { createElement, updateElement, VNode} from './virtualDom';

describe('virtualDom', () => {
	describe('createElement', () => {
		test('Создаёт одну текстовую ноду', () => {
			expect(createElement('It works!')).toMatchSnapshot();
		});
		test('Создаёт один элемент', () => {
			expect(createElement({type: 'DIV', props: {}, children: []})).toMatchSnapshot();
		});

		test('Создаёт один элемент с двумя атрибутами', () => {
			expect(createElement({
				type: 'DIV',
				props: {
					style: 'background-color: red;',
					'tab-index': 0
				},
				children: [],
			})).toMatchSnapshot();
		});

		test('Создаёт один элемент с двумя детьми', () => {
			expect(createElement({
				type: 'DIV',
				props: {},
				children: [
					{type: 'SPAN', props: {}, children: []},
					'Some text'
				]
			})).toMatchSnapshot();
		});
	});


	describe('updateElement', () => {
		let container: HTMLDivElement;

		beforeEach(() => {
			container = document.createElement('div');
			document.body.appendChild(container);
		});

		afterEach(() => {
			container.remove();
		});

		it('updates a DOM node with a new VNode', () => {
			const oldVNode: VNode = {
				type: 'DIV',
				props: {className: 'old'},
				children: [],
			};
			const newVNode: VNode = {
				type: 'DIV',
				props: {className: 'new'},
				children: [],
			};

			const oldElement = createElement(oldVNode);

			container.appendChild(oldElement);

			updateElement(container, oldVNode, newVNode);
			expect(container.firstChild).toStrictEqual(createElement(newVNode));
		});

		it('updates a DOM node with new children', () => {
			const oldVNode: VNode = {
				type: 'div',
				props: {},
				children: ['foo'],
			};
			const newVNode: VNode = {
				type: 'div',
				props: {},
				children: ['bar'],
			};

			container.appendChild(createElement(oldVNode));

			updateElement(container, oldVNode, newVNode);

			expect(container.firstChild).toStrictEqual(createElement(newVNode));
			expect(container.firstChild?.textContent).toBe('bar');
		});

		it('adds new child elements', () => {
			const oldVNode: VNode = {
				type: 'div',
				props: {},
				children: ['first'],
			};
			const newVNode: VNode = {
				type: 'div',
				props: {},
				children: ['first', 'second'],
			};

			const oldElement = createElement(oldVNode);
			container.appendChild(oldElement);

			updateElement(container, oldVNode, newVNode);

			expect(container.firstChild).toBe(oldElement);
			expect(container.firstChild?.textContent).toBe('firstsecond');
		});

		it('removes child elements', () => {
			const oldVNode: VNode = {
				type: 'div',
				props: {},
				children: ['first', 'second'],
			};
			const newVNode: VNode = {
				type: 'div',
				props: {},
				children: ['first'],
			};

			const oldElement = createElement(oldVNode);
			container.appendChild(oldElement);

			updateElement(container, oldVNode, newVNode);

			expect(container.firstChild).toBe(oldElement);
			expect(container.firstChild?.textContent).toBe('first');
		});

		test('Обновляет детей 1 -> 1 разные типы', () => {
			const oldNode = {
				type: 'DIV',
				props: {},
				children: [
					'Some text',
				]
			}
			const oldElement = createElement(oldNode);
			// соответствует Node.TEXT_NODE
			expect(oldElement.firstChild?.nodeType).toBe(3);

			container.appendChild(oldElement);
			updateElement(container, oldNode, {
				type: 'DIV',
				props: {},
				children: [
					{type: 'P', props: {}, children: []},
				]
			});

			// соответствует Node.ELEMENT_NODE
			expect(oldElement.firstChild?.nodeType).toBe(1);
		});
	});
	describe('attributes', () => {
		let container: HTMLDivElement;

		beforeEach(() => {
			container = document.createElement('div');
			document.body.appendChild(container);
		});

		afterEach(() => {
			container.remove();
		});

		test('Обновляет атрибуты 1 -> 2', () => {
			const oldNode = {
				type: 'DIV',
				props: {},
				children: [],
			}
			const oldElement = createElement(oldNode);
			container.appendChild(oldElement);

			updateElement(container, oldNode, {
				type: 'DIV',
				props: {style: {backgroundColor: 'black'}},
				children: [],
			});

			expect((oldElement as HTMLElement).getAttribute('style')).toBe("background-color: black;");
		});

		// TODO: add more tests
	});
});
