/* eslint-disable unicorn/filename-case */

module.exports = {
	SCRIPT2: `
export default class CounterElement extends LitElement {
	static get properties() { return {
		/* The total number of clicks you've done. */
		clicks: Number,
		/* The current value of the counter. */
		value: Number
	}};

	constructor() {
		super();
		this.clicks = 0;
		this.value = 0;
	}

	_onIncrement() {
		this.value++;
		this.clicks++;
		this.dispatchEvent(new CustomEvent('counter-incremented'));
	}

	_onDecrement() {
		this.value--;
		this.clicks++;
		this.dispatchEvent(new CustomEvent('counter-decremented'));
	}
}

window.customElements.define('counter-element', CounterElement);
`.replace(/\n/gi, '')
};
