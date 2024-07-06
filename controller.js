
// Main script (e.g., main.js)
import F8 from "./component.js";

F8.component('header-component', {
    template: '<h1>HEADER</h1>',
});

F8.component('counter-app', {
    data: () => {
        return {
            count: 0,
            title: 'Counter App',
        };
    },
    template: `
        <h1>{{ title }}</h1>
        <p>{{ count }}</p>
        <button @click="increment">Increment</button>
        <button @click="decrement">Decrement</button>
    `,
    methods: {
        increment() {
            this.count++;
        },
        decrement() {
            this.count--;
        },
    },
});
