export default class HTML {
	static createElement(elementName, className = '', attributes = null, text = '') {
		if (!elementName.length) {
			return null;
		}

		let element = document.createElement(elementName);

		if (attributes) {
			for (let key in attributes) {
				element.setAttribute(key, attributes[key]);
			}
		}

		if (className) {
			element.className = className;
		}

		if (text) {
			element.appendChild(HTML.createText(text));
		}

		return element;
	}

	static createText(text = null) {
		return text ? document.createTextNode(text) : null;
	}
}
