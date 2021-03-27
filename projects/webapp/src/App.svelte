<script lang="ts">
import LineSeparator from './components/interface/line_separator/LineSeparator.svelte';

</script>

<main>
	<h1>Harmony UI Kit</h1>
	<LineSeparator />

	<sector>
		<h3>Interface Components</h3>
		<div> <h4>Alert Box</h4> </div>
		<div> <h4>Breadcrumb</h4> </div>
		<div> <h4>Button</h4> </div>
		<div> <h4>Card</h4> </div>
		<div> <h4>Chip</h4> </div>
		<div> <h4>Circular Frame</h4> </div>
		<div> <h4>Context Menu</h4> </div>
		<div> <h4>Dropdown</h4> </div>
		<div> <h4>Expandable Container</h4> </div>
		<div> <h4>Floating Action Button</h4> </div>
		<div> <h4>Icon Button</h4> </div>
		<div> <h4>Line Separator</h4> </div>
		<div> <h4>Popup</h4> </div>
		<div> <h4>Progress Bar</h4> </div>
		<div> <h4>Progress Ring</h4> </div>
		<div> <h4>Resizable Container</h4> </div>
		<div> <h4>SVG Icon</h4> </div>
		<div> <h4>Tab</h4> </div>
		<div> <h4>Tooltip</h4> </div>
	</sector>
</main>

<style>
	main {
		padding: 1em;
	}

	h1 {
		color: #A71D31;
		font-size: 2em;
		font-weight: 300;
		padding: 0;
		margin: 0;
		width: auto;
	}

	h3 {
		color: #003D5B;
		padding: 0;
		margin: 0;
	}



	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>