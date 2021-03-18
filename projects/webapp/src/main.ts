import App from './App.svelte';
import * as Routes from './routes/routes';

const app = new App({
	target: document.body,
	props: {
		name: 'world',
    routes : Routes
	}
});

export default app;