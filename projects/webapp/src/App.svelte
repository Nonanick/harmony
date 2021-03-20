<script lang="ts">
	import Breadcrumb from "./components/interface/breadcrumb/Breadcrumb.svelte";
	import BreadcrumbItem from "./components/interface/breadcrumb/BreadcrumbItem.svelte";
	import Button from "./components/interface/button/Button.svelte";
	import DimmedButton from "./components/interface/button/DimmedButton.svelte";
	import OutlineButton from "./components/interface/button/OutlineButton.svelte";
	import LineSeparator from "./components/interface/line_separator/LineSeparator.svelte";
	import SvgIcon from "./components/interface/svg_icon/SVGIcon.svelte";
</script>

<style>
	main {
		position: relative;
		padding: 1em;
		margin: 0;
		box-sizing: border-box;
	}

	h1 {
		color: var(--main-color);
		font-size: 2em;
		font-weight: 300;
		padding: 0;
		margin: 0;
		width: auto;
	}

	h3 {
		color: var(--secondary-color);
		padding: 0;
		margin: 0;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<main>
	<h1>Harmony UI Kit</h1>
	<LineSeparator />

	<sector>
		<h3>Interface Components</h3>
		<div><h4>Alert Box</h4></div>
		<div>
			<h4>Breadcrumb</h4>
			<Breadcrumb separator="▶️">
				<BreadcrumbItem class="clickable">
					<SvgIcon props={{ src: "/img/icons/network.svg" }}  />  Menu
				</BreadcrumbItem>
				<BreadcrumbItem class="clickable">Submenu</BreadcrumbItem>
				<BreadcrumbItem>Another Submenu</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div>
			<h4>Button</h4>
			<DimmedButton>Dimmed Button</DimmedButton>
			<OutlineButton>Outline Button</OutlineButton>
			<Button>Button</Button>
		</div>
		<div><h4>Card</h4></div>
		<div><h4>Chip</h4></div>
		<div><h4>Circular Frame</h4></div>
		<div><h4>Context Menu</h4></div>
		<div><h4>Dropdown</h4></div>
		<div><h4>Expandable Container</h4></div>
		<div><h4>Floating Action Button</h4></div>
		<div><h4>Icon Button</h4></div>
		<div><h4>Line Separator</h4></div>
		<div><h4>Popup</h4></div>
		<div><h4>Progress Bar</h4></div>
		<div><h4>Progress Ring</h4></div>
		<div><h4>Resizable Container</h4></div>
		<div><h4>SVG Icon</h4></div>
		<div><h4>Tab</h4></div>
		<div><h4>Tooltip</h4></div>
	</sector>
</main>
