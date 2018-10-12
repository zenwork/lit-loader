const j = require('jscodeshift');

const renderTemplate = templateString => `
	render(props) {
		return html\`${templateString}\`
	}
`.replace(/\t/gi, '');

function test(item, source) {
	console.log('item:' + item.node.name.toString());
	if (source.indexOf('extends LitElement') === -1) {
		return j(item).replaceWith(`${item.node.name} extends LitElement`);
	}

	return j(item).replaceWith(`${item.node.name}`);
}

const addLitReferences = source => j(source)
	.find(j.ExportDefaultDeclaration)
	.insertBefore('import {LitElement, html} from \'@polymer/lit-element\'')
	.find(j.Identifier)
	.at(0)
	.forEach(item => test(item, source))
	.toSource();

const addRenderTemplate = (jsSource, templateString) => j(jsSource)
	.find(j.ClassDeclaration)
	.find(j.ClassBody)
	.find(j.MethodDefinition)
	.at(-1)
	.forEach(path => j(path).insertAfter(renderTemplate(templateString)))
	.toSource();

module.exports = (jsSource, templateString) =>
	addRenderTemplate(addLitReferences(jsSource), templateString);

