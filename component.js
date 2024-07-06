class F8 {
    constructor() {
        console.log('F8 constructor');
    }

    static component(label, options) {
        class CustomElement extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });

                // Initialize data
                this.data = typeof options.data === 'function' ? options.data() : {};

                // Bind methods to this.data
                if (typeof options.methods === 'object') {
                    for (const methodName in options.methods) {
                        this.data[methodName] = options.methods[methodName].bind(this.data);
                    }
                }

                // Render template
                this.render();
            }

            render() {
                // Simple template interpolation
                let template = options.template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
                    return this.data[key] !== undefined ? this.data[key] : '';
                });

                this.shadowRoot.innerHTML = template;

                // Bind events
                this.shadowRoot.querySelectorAll('[\\@click]').forEach(button => {
                    const methodName = button.getAttribute('@click');
                    if (typeof this.data[methodName] === 'function') {
                        button.addEventListener('click', () => {
                            this.data[methodName]();
                            this.render(); // Re-render on data change
                        });
                    }
                });
            }
        }

        // Define the custom element
        customElements.define(label, CustomElement);
    }
}

export default F8;